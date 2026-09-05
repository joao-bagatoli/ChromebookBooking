using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.Services;
using ChromebookBooking.Api.DTOs;
using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Services;

public sealed class BookingService : IBookingService
{
    private readonly AppDbContext _context;
    private readonly CabinetAllocator _allocator;

    private const int MINIMUM_HOURS = 48;

    public BookingService(AppDbContext context)
    {
        _context = context;
        _allocator = new CabinetAllocator();
    }

    public async Task BookAsync(DateOnly date, int classPeriodId, int teacherId, int sectionId, bool isPartial, int? chromebooksQuantity)
    {
        ClassPeriod? classPeriod = await GetClassPeriodByIdAsync(classPeriodId);
        if (classPeriod is null)
        {
            throw new ArgumentException("Horário de aula não encontrado");
        }

        if (!IsValidBookingTime(date, classPeriod))
        {
            throw new InvalidOperationException($"As reservas devem ser feitas com no mínimo {MINIMUM_HOURS} horas de antecedência");
        }

        Cabinet cabinet = await GetAllocatedCabinetAsync(date, classPeriodId, sectionId);

        var booking = new Booking(date, classPeriodId, cabinet.Id, teacherId, sectionId, isPartial, chromebooksQuantity);
        await _context.Bookings.AddAsync(booking);
        await _context.SaveChangesAsync();
    }

    private static bool IsValidBookingTime(DateOnly date, ClassPeriod classPeriod)
    {
        DateTime classStartDate = date.ToDateTime(classPeriod.StartTime);
        TimeSpan timeUntilClass = classStartDate - DateTime.Now;
        return timeUntilClass.TotalHours >= MINIMUM_HOURS;
    }

    private async Task<ClassPeriod?> GetClassPeriodByIdAsync(int id)
    {
        return await _context.ClassPeriods
            .AsNoTracking()
            .Where(cp => cp.Id == id)
            .FirstOrDefaultAsync();
    }

    private async Task<Cabinet> GetAllocatedCabinetAsync(DateOnly date, int classPeriodId, int sectionId)
    {
        var activeCabinets = await _context.Cabinets
            .AsNoTracking()
            .Where(c => c.IsActive == true)
            .ToListAsync();

        var todaysBooking = await _context.Bookings
            .AsNoTracking()
            .Where(b => b.Date == date)
            .ToListAsync();

        Cabinet allocated = _allocator.Allocate(classPeriodId, sectionId, activeCabinets, todaysBooking);
        return allocated;
    }

    public async Task CancelBookingAsync(int bookingId, Guid authUserId)
    {
        User? loggedUser = await _context.Users
            .AsNoTracking()
            .Where(u => u.AuthUserId == authUserId)
            .FirstOrDefaultAsync();

        if (loggedUser is null)
        {
            throw new UnauthorizedAccessException("Usuário não encontrado");
        }

        Booking? booking = await _context.Bookings.FindAsync(bookingId);

        if (booking is null)
        {
            throw new KeyNotFoundException("Reserva não encontrada");
        }

        bool isOwner = booking.TeacherId == loggedUser.Id;

        if (!isOwner && !loggedUser.IsAdmin)
        {
            throw new UnauthorizedAccessException("Usuário não autorizado a cancelar esta reserva");
        }

        booking.Cancel();
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<BookingResponse>> GetWeeklyBookingsAsync(DateOnly startDate, DateOnly endDate)
    {
        if (startDate > endDate)
        {
            throw new ArgumentException("A data inicial não pode ser maior que a data final");
        }

        return await _context.Bookings
            .AsNoTracking()
            .Where(b => b.Date >= startDate && b.Date <= endDate && !b.IsCancelled)
            .OrderBy(b => b.Date)
            .ThenBy(b => b.ClassPeriod!.StartTime)
            .Select(b => new BookingResponse(
                b.Id,
                b.Date,
                b.ClassPeriodId,
                b.ClassPeriod!.Name,
                b.CabinetId,
                b.Cabinet!.Name,
                b.Teacher!.Email.Value,
                b.Section!.Name,
                b.IsPartial,
                b.ChromebooksQuantity
            ))
            .ToListAsync();
    }
}
