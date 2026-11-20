namespace ChromebookBooking.Api.DTOs;

public sealed record BookRequest(
    DateOnly Date,
    int ClassPeriodId,
    int TeacherId,
    int SectionId,
    bool IsPartial,
    int? ChromebooksQuantity,
    string? Discipline = null);

public sealed record BookingResponse(
    int Id,
    DateOnly Date,
    int ClassPeriodId,
    string ClassPeriodName,
    int CabinetId,
    string CabinetName,
    int TeacherId,
    string TeacherName,
    string TeacherEmail,
    int SectionId,
    string SectionName,
    bool IsPartial,
    int? ChromebooksQuantity,
    string? Discipline);

public sealed record DailyBooking(
    int Id,
    int ClassPeriodId,
    string ClassPeriodName,
    int CabinetId,
    string CabinetName,
    string TeacherEmail,
    string SectionName
);

public sealed record DailyBookingPeriod(
    int ClassPeriodId,
    string ClassPeriodName,
    TimeOnly StartTime,
    TimeOnly EndTime,
    int OccupiedCabinets,
    int TotalCabinets,
    IReadOnlyList<DailyBooking> Bookings
);