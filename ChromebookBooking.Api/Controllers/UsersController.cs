using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Extensions;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _service.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _service.GetUserByIdAsync(id);
        return Ok(user);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var user = await _service.CreateUserAsync(request);
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpPatch("{id}/activate")]
    [Authorize]
    public async Task<IActionResult> ActivateUser(int id)
    {
        await _service.ActivateUserAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/deactivate")]
    [Authorize]
    public async Task<IActionResult> DeactivateUser(int id)
    {
        await _service.DeactivateUserAsync(id);
        return NoContent();
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var loggedUser = await _service.GetLoggedUserAsync(User.GetUserId(), User.GetUserEmail());
        return Ok(loggedUser);
    }

}
