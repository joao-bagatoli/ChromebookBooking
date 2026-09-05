namespace ChromebookBooking.Api.Interfaces;

public interface IBookingService
{
    Task BookAsync(DateOnly date, int classPeriodId, int teacherId, int sectionId, bool isPartial, int? chromebooksQuantity);
    Task CancelBookingAsync(int bookingId, Guid authUserId);
}
