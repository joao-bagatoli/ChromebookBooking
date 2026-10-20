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
            .OrderBy(c => c.Name)
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

    public async Task<CabinetsOverviewResponse> GetCabinetsOverviewAsync()
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var currentTime = TimeOnly.FromDateTime(DateTime.Now);

        var classPeriods = await _context.ClassPeriods
            .AsNoTracking()
            .Select(c => new { c.Id, c.Name, c.StartTime, c.EndTime })
            .OrderBy(c => c.StartTime)
            .ToListAsync();

        var currentPeriod = classPeriods.FirstOrDefault(c => c.StartTime <= currentTime && c.EndTime >= currentTime);

        var cabinets = await _context.Cabinets
            .AsNoTracking()
            .Select(c => new { c.Id, c.Name, c.IsActive })
            .OrderBy(c => c.Id)
            .ToListAsync();

        var todayBookings = await _context.Bookings
            .AsNoTracking()
            .Where(b => b.Date == today && !b.IsCancelled)
            .Select(b => new { b.CabinetId, b.ClassPeriodId })
            .ToListAsync();

        var cabinetStatuses = new List<CabinetStatus>();

        foreach (var cabinet in cabinets)
        {
            if (!cabinet.IsActive)
            {
                cabinetStatuses.Add(new CabinetStatus(cabinet.Id, cabinet.Name, CabinetStatusType.Inactive));
                continue;
            }

            var isBookedNow = currentPeriod != null && todayBookings
                .Any(b => b.CabinetId == cabinet.Id && b.ClassPeriodId == currentPeriod.Id);

            var status = isBookedNow ? CabinetStatusType.Booked : CabinetStatusType.Available;
            cabinetStatuses.Add(new CabinetStatus(cabinet.Id, cabinet.Name, status));
        }

        var currentClassPeriod = new CurrentClassPeriod(
            currentPeriod?.Id ?? -1,
            currentPeriod?.Name ?? "Fora do horário de aula",
            IsClassTime: currentPeriod != null
        );

        return new CabinetsOverviewResponse(currentClassPeriod, cabinetStatuses);
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