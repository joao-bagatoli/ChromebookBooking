using ChromebookBooking.Api.DTOs;

namespace ChromebookBooking.Api.Interfaces;

public interface IUserService
{
    Task<IReadOnlyList<UserResponse>> GetAllUsersAsync();
    Task<UserResponse> GetUserByIdAsync(int id);
    Task<UserResponse> CreateUserAsync(CreateUserRequest request);
    Task UpdateUserAsync(int id, UpdateUserRequest request);
    Task<LoggedUserResponse> GetLoggedUserAsync(Guid authUserId, string email);
    Task<IReadOnlyList<SectionResponse>> GetUserSectionsAsync(int userId);
    Task DeleteUserAsync(int id);
}
