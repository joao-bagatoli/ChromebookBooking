namespace ChromebookBooking.Api.DTOs;

public sealed record BookRequest(
    DateOnly Date, 
    int ClassPeriodId, 
    int TeacherId, 
    int SectionId, 
    bool IsPartial, 
    int? ChromebooksQuantity);