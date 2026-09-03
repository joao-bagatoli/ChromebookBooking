using ChromebookBooking.Api.DTOs;
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
}
