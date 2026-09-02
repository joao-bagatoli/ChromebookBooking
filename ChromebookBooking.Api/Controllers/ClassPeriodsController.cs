using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ClassPeriodsController : ControllerBase
{
    private readonly IClassPeriodService _service;

    public ClassPeriodsController(IClassPeriodService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClassPeriods()
    {
        var classPeriods = await _service.GetAllClassPeriodsAsync();
        return Ok(classPeriods);
    }
}
