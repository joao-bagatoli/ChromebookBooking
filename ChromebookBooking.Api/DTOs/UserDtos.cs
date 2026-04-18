using ChromebookBooking.Api.Domain.Common.Enums;

namespace ChromebookBooking.Api.DTOs;

public sealed record CreateUserRequest(string Email, UserRole Role);

public sealed record UserResponse(int Id, string Email, UserRole Role, bool IsActive);