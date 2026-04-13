using System.Security.Claims;

namespace ChromebookBooking.Api.Extensions;

public static class UserClaims
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        string userId = user.FindFirst("sub")?.Value 
            ?? throw new UnauthorizedAccessException("Claim 'sub' não encontrada.");

        return Guid.Parse(userId);
    }

    public static string GetUserEmail(this ClaimsPrincipal user)
    {
        string email = user.FindFirst("email")?.Value 
            ?? throw new UnauthorizedAccessException("Claim 'email' não encontrada.");
        
        return email;
    }
}
