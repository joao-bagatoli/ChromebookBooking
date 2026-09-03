using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class ClassPeriodService : IClassPeriodService
{
    private readonly AppDbContext _context;

    public ClassPeriodService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<ClassPeriodResponse>> GetAllClassPeriodsAsync()
    {
        return await _context.ClassPeriods
            .AsNoTracking()
            .OrderBy(cp => cp.StartTime)
            .Select(cp => new ClassPeriodResponse(
                cp.Id,
                cp.Name,
                cp.Shift,
                cp.StartTime,
                cp.EndTime
            ))
            .ToListAsync();
    }

}
