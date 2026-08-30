using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Api.Domain.Services;

public sealed class CabinetAllocator
{
    public Cabinet Allocate(
        int requestClassPeriodId,
        int requestSectionId,
        IReadOnlyCollection<Cabinet> activeCabinets,
        IReadOnlyCollection<Booking> todaysBookings
        )
    {
        var availableCabinets = GetAvailableCabinets(requestClassPeriodId, activeCabinets, todaysBookings);

        // Bloqueio por lotação máxima
        if (availableCabinets.Count == 0)
        {
            throw new DomainException("Não há gabinetes disponíveis para este horário");
        }

        var preferredCabinet = GetPreferredCabinet(requestClassPeriodId, requestSectionId, todaysBookings, availableCabinets);

        // Retorna o preferido ou o primeiro disponível
        return preferredCabinet ?? availableCabinets.First();
    }

    private static IReadOnlyList<Cabinet> GetAvailableCabinets(
        int requestClassPeriodId,
        IReadOnlyCollection<Cabinet> activeCabinets,
        IReadOnlyCollection<Booking> todaysBookings)
    {
        // Encontra os gabinetes reservados para o horário solicitado
        var occupiedCabinetIds = todaysBookings
            .Where(b => b.ClassPeriodId == requestClassPeriodId && !b.IsCancelled)
            .Select(b => b.CabinetId)
            .ToHashSet();

        return activeCabinets
            .Where(c => !occupiedCabinetIds.Contains(c.Id))
            .ToList();
    }

    private static Cabinet? GetPreferredCabinet(
        int requestClassPeriodId,
        int requestSectionId,
        IReadOnlyCollection<Booking> todaysBookings,
        IReadOnlyList<Cabinet> availableCabinets)
    {
        // Buscar se a turma já usou um gabinete hoje
        var previouslyUsedCabinetId = todaysBookings
            .Where(b => b.SectionId == requestSectionId && !b.IsCancelled && b.ClassPeriodId < requestClassPeriodId)
            .OrderByDescending(b => b.ClassPeriodId)
            .Select(b => b.CabinetId)
            .FirstOrDefault();

        if (previouslyUsedCabinetId == 0)
        {
            return null;
        }

        // Se encontrou um uso anterior, tenta alocar o mesmo gabinete
        return availableCabinets.FirstOrDefault(c => c.Id == previouslyUsedCabinetId);
    }
}
