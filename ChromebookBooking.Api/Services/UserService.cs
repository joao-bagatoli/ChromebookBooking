using ChromebookBooking.Api.Configurations;
using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.Services;
using ChromebookBooking.Api.Domain.ValueObjects;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ChromebookBooking.Api.Services;

public sealed class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly SecuritySettings _securitySettings;

    public UserService(AppDbContext context, IOptions<SecuritySettings> settings)
    {
        _context = context;
        _securitySettings = settings.Value;
    }

    public async Task<IReadOnlyList<UserResponse>> GetAllUsersAsync()
    {
        return await _context.Users
            .Include(u => u.Sections)
            .AsNoTracking()
            .Select(u => ToResponse(u))
            .ToListAsync();
    }

    public async Task<UserResponse> GetUserByIdAsync(int id)
    {
        var user = await _context.Users
            .Include(u => u.Sections)
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

        EmailAccessPolicy.EnsureIsAllowed(email, _securitySettings.AllowedBypassEmails);

        bool emailExists = await _context.Users.AnyAsync(u => u.Email == email);
        if (emailExists)
        {
            throw new InvalidOperationException($"O email '{request.Email}' já está cadastrado no sistema.");
        }

        var user = new User(email, request.Role);

        if (user.IsTeacher && request.SectionIds is not null && request.SectionIds.Any())
        {
            var sections = await _context.Sections
                .Where(s => request.SectionIds.Contains(s.Id))
                .ToListAsync();

            user.UpdateSections(sections);
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return ToResponse(user);
    }

    public async Task UpdateUserAsync(int id, UpdateUserRequest request)
    {
        var user = await _context.Users
            .Include(u => u.Sections)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {id} não encontrado.");
        }

        if (user.Role != request.Role)
        {
            user.ChangeRole(request.Role);
        }

        if (user.IsTeacher)
        {
            var sectionIds = request.SectionIds ?? Enumerable.Empty<int>();
            var sections = await _context.Sections
                .Where(s => sectionIds.Contains(s.Id))
                .ToListAsync();

            user.UpdateSections(sections);
        }

        await _context.SaveChangesAsync();
    }

    public async Task ActivateUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {id} não encontrado.");
        }
        user.Activate();
        await _context.SaveChangesAsync();
    }

    public async Task DeactivateUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {id} não encontrado.");
        }
        user.Deactivate();
        await _context.SaveChangesAsync();
    }

    public async Task<LoggedUserResponse> GetLoggedUserAsync(Guid authUserId, string email)
    {
        User loggedUser = await ValidateAccessAsync(email);
        bool isFirstLogin = loggedUser.AuthUserId is null;
        if (isFirstLogin) await LinkSupabaseAccountAsync(loggedUser, authUserId);
        IReadOnlyList<string> modules = loggedUser.GetAccessibleModules();
        return new LoggedUserResponse(loggedUser.Id, loggedUser.Email.Value, loggedUser.Role, modules);
    }

    private async Task<User> ValidateAccessAsync(string email)
    {
        Email targetEmail = Email.Create(email);

        EmailAccessPolicy.EnsureIsAllowed(targetEmail, _securitySettings.AllowedBypassEmails);

        User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == targetEmail)
            ?? throw new UnauthorizedAccessException("Usuário não cadastrado.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("Usuário inativo.");

        return user;
    }

    private async Task LinkSupabaseAccountAsync(User user, Guid authUserId)
    {
        user.LinkSupabaseAccount(authUserId);
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<SectionResponse>> GetUserSectionsAsync(int userId)
    {
        var user = await _context.Users
            .Include(u => u.Sections)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new KeyNotFoundException($"Usuário com ID {userId} não encontrado.");
        }

        if (!user.IsTeacher)
        {
            throw new InvalidOperationException("Apenas usuários com perfil de Professor possuem turmas vinculadas.");
        }

        var sections = user.Sections
            .Select(s => new SectionResponse(s.Id, s.Name))
            .ToList();

        return sections;
    }

    private static UserResponse ToResponse(User user)
    {
        var sections = user.Sections
            .Select(s => new SectionResponse(s.Id, s.Name))
            .ToList();

        return new UserResponse(user.Id, user.Email.Value, user.Role, user.IsActive, sections);
    }
}
