namespace ChromebookBooking.Api.DTOs;

public sealed record CreateCabinetRequest(string Name);

public sealed record UpdateCabinetRequest(string Name);

public sealed record CabinetResponse(int Id, string Name, bool IsActive);
