using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class CabinetService : ICabinetService
{
    private readonly AppDbContext _context;

    public CabinetService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<CabinetResponse>> GetAllCabinetsAsync()
    {
        return await _context.Cabinets
            .AsNoTracking()
            .Select(c => ToResponse(c))
            .ToListAsync();
    }

    public async Task<CabinetResponse> GetCabinetByIdAsync(int id)
    {
        var cabinet = await _context.Cabinets
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (cabinet is null)
        {
            throw new KeyNotFoundException($"Gabinete com ID {id} não encontrado.");
        }

        return ToResponse(cabinet);
    }

    public async Task<CabinetResponse> CreateCabinetAsync(CreateCabinetRequest request)
    {
        var cabinet = new Cabinet(request.Name);
        _context.Cabinets.Add(cabinet);
        await _context.SaveChangesAsync();
        return ToResponse(cabinet);
    }

    public async Task UpdateCabinetAsync(int id, UpdateCabinetRequest request)
    {
        Cabinet cabinet = await GetCabinetAsync(id);
        cabinet.UpdateName(request.Name);
        await _context.SaveChangesAsync();
    }

    public async Task ActivateCabinetAsync(int id)
    {
        Cabinet cabinet = await GetCabinetAsync(id);
        cabinet.Activate();
        await _context.SaveChangesAsync();
    }

    public async Task DeactivateCabinetAsync(int id)
    {
        Cabinet cabinet = await GetCabinetAsync(id);
        cabinet.Deactivate();
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCabinetAsync(int id)
    {
        Cabinet cabinet = await GetCabinetAsync(id);
        _context.Cabinets.Remove(cabinet);
        await _context.SaveChangesAsync();
    }

    private static CabinetResponse ToResponse(Cabinet cabinet)
    {
        return new CabinetResponse(cabinet.Id, cabinet.Name, cabinet.IsActive);
    }

    private async Task<Cabinet> GetCabinetAsync(int id)
    {
        return await _context.Cabinets.FindAsync(id)
            ?? throw new KeyNotFoundException($"Gabinete com ID {id} não encontrado.");
    }

}
