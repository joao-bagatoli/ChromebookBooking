using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task ValidateAccessAsync(Guid authUserId, string email)
    {
        User user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Value == email) 
            ?? throw new UnauthorizedAccessException("Usuário não cadastrado.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("Usuário inativo.");

        if (user.AuthUserId is null)
        {
            user.LinkSupabaseAccount(authUserId);
            await _context.SaveChangesAsync();
        }
    }
}
