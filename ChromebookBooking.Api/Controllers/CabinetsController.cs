using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CabinetsController : ControllerBase
{
    private readonly ICabinetService _service;

    public CabinetsController(ICabinetService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult AddCabinet()
    {
        Cabinet cabinet = _service.AddCabinet();
        return Ok(cabinet);
    }
}
