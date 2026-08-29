namespace ChromebookBooking.Api.DTOs;

public sealed record CreateSectionRequest(string Name);

public sealed record UpdateSectionRequest(string Name, bool IsActive);

public sealed record SectionResponse(int Id, string Name, bool? IsActive);
