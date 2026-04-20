using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CabinetsController : ControllerBase
{
    private readonly ICabinetService _service;

    public CabinetsController(ICabinetService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetAllCabinets()
    {
        var cabinets = await _service.GetAllCabinetsAsync();
        return Ok(cabinets);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetCabinetById(int id)
    {
        var cabinet = await _service.GetCabinetByIdAsync(id);
        return Ok(cabinet);
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> CreateCabinet(CreateCabinetRequest request)
    {
        var cabinet = await _service.CreateCabinetAsync(request);
        return CreatedAtAction(nameof(GetCabinetById), new { id = cabinet.Id }, cabinet);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> UpdateCabinet(int id, UpdateCabinetRequest request)
    {
        await _service.UpdateCabinetAsync(id, request);
        return NoContent();
    }

    [HttpPatch("{id}/activate")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> ActivateCabinet(int id)
    {
        await _service.ActivateCabinetAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/deactivate")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> DeactivateCabinet(int id)
    {
        await _service.DeactivateCabinetAsync(id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> DeleteCabinet(int id)
    {
        await _service.DeleteCabinetAsync(id);
        return NoContent();
    }

}
