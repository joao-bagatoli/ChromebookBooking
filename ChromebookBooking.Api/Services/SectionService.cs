using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class SectionService : ISectionService
{
    private readonly AppDbContext _context;

    public SectionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<SectionResponse>> GetAllSectionsAsync()
    {
        return await _context.Sections
            .AsNoTracking()
            .Select(s => ToResponse(s))
            .ToListAsync();
    }

    public async Task<SectionResponse> GetSectionByIdAsync(int id)
    {
        var section = await _context.Sections
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id);

        if (section is null)
        {
            throw new KeyNotFoundException($"Turma com ID {id} não encontrada.");
        }

        return ToResponse(section);
    }

    public async Task<SectionResponse> CreateSectionAsync(CreateSectionRequest request)
    {
        var section = new Section(request.Name);
        _context.Sections.Add(section);
        await _context.SaveChangesAsync();
        return ToResponse(section);
    }

    public async Task UpdateSectionAsync(int id, UpdateSectionRequest request)
    {
        Section section = await GetSectionAsync(id);
        section.UpdateName(request.Name);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSectionAsync(int id)
    {
        Section section = await GetSectionAsync(id);
        _context.Sections.Remove(section);
        await _context.SaveChangesAsync();
    }

    private async Task<Section> GetSectionAsync(int id)
    {
        return await _context.Sections.FindAsync(id)
            ?? throw new KeyNotFoundException($"Turma com ID {id} não encontrada."); ;
    }

    private static SectionResponse ToResponse(Section section)
    {
        return new SectionResponse(section.Id, section.Name);
    }
}
