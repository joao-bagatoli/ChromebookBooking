using ChromebookBooking.Api.DTOs;

namespace ChromebookBooking.Api.Interfaces;

public interface IClassPeriodService
{
    Task<IReadOnlyList<ClassPeriodResponse>> GetAllClassPeriodsAsync();
}
