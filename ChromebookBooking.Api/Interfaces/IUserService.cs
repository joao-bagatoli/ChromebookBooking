using ChromebookBooking.Api.DTOs;

namespace ChromebookBooking.Api.Interfaces;

public interface IUserService
{
    Task<IReadOnlyList<UserResponse>> GetAllUsersAsync();
    Task<UserResponse> GetUserByIdAsync(int id);
    Task<UserResponse> CreateUserAsync(CreateUserRequest request);
    Task ActivateUserAsync(int id);
    Task DeactivateUserAsync(int id);
}
