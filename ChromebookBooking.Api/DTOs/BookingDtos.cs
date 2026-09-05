namespace ChromebookBooking.Api.DTOs;

public sealed record BookRequest(
    DateOnly Date, 
    int ClassPeriodId, 
    int TeacherId, 
    int SectionId, 
    bool IsPartial, 
    int? ChromebooksQuantity);

public sealed record BookingResponse(
    int Id,
    DateOnly Date,
    int ClassPeriodId,
    string ClassPeriodName,
    int CabinetId,
    string CabinetName, 
    string TeacherEmail,
    string SectionName,
    bool IsPartial,
    int? ChromebooksQuantity);