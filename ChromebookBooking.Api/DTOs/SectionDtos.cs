using ChromebookBooking.Api.Domain.Common.Enums;

namespace ChromebookBooking.Api.DTOs;

public sealed record CreateSectionRequest(string Name, Shift Shift);

public sealed record UpdateSectionRequest(string Name, Shift Shift, bool IsActive);

public sealed record SectionResponse(int Id, string Name, Shift? Shift, bool? IsActive);
