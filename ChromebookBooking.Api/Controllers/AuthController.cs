using ChromebookBooking.Api.Extensions;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        await _service.ValidateAccessAsync(User.GetUserId(), User.GetUserEmail());
        return Ok();
    }
}
