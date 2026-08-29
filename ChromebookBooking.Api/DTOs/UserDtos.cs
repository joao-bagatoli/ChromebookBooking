using ChromebookBooking.Api.Domain.Common.Enums;

namespace ChromebookBooking.Api.DTOs;

public sealed record CreateUserRequest(string Email, UserRole Role, IEnumerable<int> SectionIds = null);

public sealed record UpdateUserRequest(UserRole Role, bool IsActive, IEnumerable<int> SectionIds = null);

public sealed record UserResponse(int Id, string Email, UserRole Role, bool IsActive, IReadOnlyList<SectionResponse> Sections);

public sealed record LoggedUserResponse(int Id, string Email, UserRole Role, IReadOnlyList<string> Modules);