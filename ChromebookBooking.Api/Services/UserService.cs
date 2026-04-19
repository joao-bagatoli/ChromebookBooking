using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.ValueObjects;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<UserResponse>> GetAllUsersAsync()
    {
        return await _context.Users
            .AsNoTracking()
            .Select(u => ToResponse(u))
            .ToListAsync();
    }

    public async Task<UserResponse> GetUserByIdAsync(int id)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {id} não encontrado.");
        }

        return ToResponse(user);
    }

    public async Task<UserResponse> CreateUserAsync(CreateUserRequest request)
    {
        var email = Email.Create(request.Email);
        bool emailExists = await _context.Users.AnyAsync(u => u.Email == email);
        if (emailExists)
        {
            throw new InvalidOperationException($"O email '{request.Email}' já está cadastrado no sistema.");
        }

        var user = new User(email, request.Role);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return ToResponse(user);
    }

    public async Task ActivateUserAsync(int id)
    {
        User user = await GetUserAsync(id);
        user.Activate();
        await _context.SaveChangesAsync();
    }

    public async Task DeactivateUserAsync(int id)
    {
        User user = await GetUserAsync(id);
        user.Deactivate();
        await _context.SaveChangesAsync();
    }

    public async Task ValidateAccessAsync(Guid authUserId, string email)
    {
        Email targetEmail = Email.Create(email);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == targetEmail)
            ?? throw new UnauthorizedAccessException("Usuário não cadastrado.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("Usuário inativo.");

        if (user.AuthUserId is null)
        {
            user.LinkSupabaseAccount(authUserId);
            await _context.SaveChangesAsync();
        }
    }

    private async Task<User> GetUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {id} não encontrado.");
        }
        return user;
    }

    private static UserResponse ToResponse(User user)
    {
        return new UserResponse(user.Id, user.Email.Value, user.Role, user.IsActive);
    }
}
