using ChromebookBooking.Api.Domain.Common.Enums;

namespace ChromebookBooking.Api.DTOs;

public sealed record ClassPeriodResponse(
    int Id,
    string Name,
    Shift Shift,
    TimeOnly StartTime,
    TimeOnly EndTime
);
