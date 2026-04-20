using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChromebookBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class SectionsController : ControllerBase
{
    private readonly ISectionService _service;

    public SectionsController(ISectionService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetAllSections()
    {
        var sections = await _service.GetAllSectionsAsync();
        return Ok(sections);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> GetSectionById(int id)
    {
        var section = await _service.GetSectionByIdAsync(id);
        return Ok(section);
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> CreateSection(CreateSectionRequest request)
    {
        var section = await _service.CreateSectionAsync(request);
        return CreatedAtAction(nameof(GetSectionById), new { id = section.Id }, section);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> UpdateSection(int id, UpdateSectionRequest request)
    {
        await _service.UpdateSectionAsync(id, request);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> DeleteSection(int id)
    {
        await _service.DeleteSectionAsync(id);
        return NoContent();
    }
}