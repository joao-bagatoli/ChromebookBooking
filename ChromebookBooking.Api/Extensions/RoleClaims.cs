using ChromebookBooking.Api.Domain.ValueObjects;
using ChromebookBooking.Api.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;

namespace ChromebookBooking.Api.Extensions;

public sealed class RoleClaims : IClaimsTransformation
{
    private readonly IServiceProvider _service;
    private readonly IMemoryCache _cache;
    private const string RoleAssignedMarker = "AppRoleAssigned";

    public RoleClaims(IServiceProvider service, IMemoryCache cache)
    {
        _service = service;
        _cache = cache;
    }

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        if (!principal.Identity!.IsAuthenticated || principal.HasClaim(c => c.Type == RoleAssignedMarker))
        {
            return principal;
        }

        string email = principal.GetUserEmail();
        string cacheKey = $"role:{email}";

        if (!_cache.TryGetValue(cacheKey, out string? userRole))
        {
            Email targetEmail = Email.Create(email);
            using var scope = _service.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            userRole = await context.Users
                .AsNoTracking()
                .Where(u => u.Email == targetEmail && u.IsActive)
                .Select(u => u.Role.ToString())
                .FirstOrDefaultAsync();

            _cache.Set(cacheKey, userRole, TimeSpan.FromMinutes(5));
        }

        if (userRole is not null)
        {
            var clone = principal.Clone();
            var identity = new ClaimsIdentity();

            identity.AddClaim(new Claim(ClaimTypes.Role, userRole));
            identity.AddClaim(new Claim(RoleAssignedMarker, "true"));
            clone.AddIdentity(identity);

            return clone;
        }

        return principal;
    }
}
