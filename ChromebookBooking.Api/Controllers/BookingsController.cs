using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Extensions;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class BookingsController : ControllerBase
{
    private readonly IBookingService _service;

    public BookingsController(IBookingService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetBookings()
    {
        var bookings = await _service.GetBookingsAsync();
        return Ok(bookings);
    }

    [HttpGet("today")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetTodayBookings()
    {
        var bookings = await _service.GetTodayBookingsAsync();
        return Ok(bookings);
    }

    [HttpGet("weekly")]
    [Authorize]
    public async Task<IActionResult> GetWeeklyBookings(DateOnly startDate, DateOnly endDate)
    {
        var bookings = await _service.GetWeeklyBookingsAsync(startDate, endDate);
        return Ok(bookings);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> BookChromebooks(BookRequest request)
    {
        await _service.BookAsync(
            request.Date, 
            request.ClassPeriodId, 
            request.TeacherId, 
            request.SectionId, 
            request.IsPartial, 
            request.ChromebooksQuantity);
        return Ok();
    }

    [HttpPatch("{id}/cancel")]
    [Authorize]
    public async Task<IActionResult> CancelBooking(int id)
    {
        Guid authUserId = User.GetUserId();
        await _service.CancelBookingAsync(id, authUserId);
        return NoContent();
    }

}
