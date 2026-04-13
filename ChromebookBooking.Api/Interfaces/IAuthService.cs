namespace ChromebookBooking.Api.Interfaces;

public interface IAuthService
{
    Task ValidateAccessAsync(Guid authUserId, string email);
}
