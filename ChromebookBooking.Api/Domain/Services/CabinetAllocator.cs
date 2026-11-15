using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Api.Domain.Services;

public sealed class CabinetAllocator
{
    public AllocationResult Allocate(
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

        var allocationResult = GetAllocation(requestClassPeriodId, requestSectionId, activeCabinets, availableCabinets, todaysBookings);
        return allocationResult;
    }

    private static List<Cabinet> GetAvailableCabinets(
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

    private static AllocationResult GetAllocation(
            int requestClassPeriodId,
            int requestSectionId,
            IReadOnlyCollection<Cabinet> activeCabinets,
            IReadOnlyList<Cabinet> availableCabinets,
            IReadOnlyCollection<Booking> todaysBookings)
    {
        // Busca se a turma usou um gabinete na AULA ANTERIOR
        var previouslyUsedCabinetId = todaysBookings
            .Where(b => b.SectionId == requestSectionId &&
                        !b.IsCancelled &&
                        b.ClassPeriodId == requestClassPeriodId - 1)
            .Select(b => b.CabinetId)
            .FirstOrDefault();

        // Se a turma não usou gabinete na aula anterior, pega o primeiro disponível
        if (previouslyUsedCabinetId == 0)
        {
            return new AllocationResult(availableCabinets.First());
        }

        var preferredCabinet = activeCabinets.First(c => c.Id == previouslyUsedCabinetId);

        // Se o gabinete preferido está na lista de disponíveis, apenas aloque-o
        if (availableCabinets.Any(c => c.Id == previouslyUsedCabinetId))
        {
            return new AllocationResult(preferredCabinet);
        }

        // Se o preferido NÃO está disponível, outro professor o pegou. Fazemos o remanejamento (Swap)!
        var conflictingBooking = todaysBookings.First(b =>
            b.CabinetId == previouslyUsedCabinetId &&
            b.ClassPeriodId == requestClassPeriodId &&
            !b.IsCancelled);

        var replacementCabinet = availableCabinets.First();

        return new AllocationResult(preferredCabinet, conflictingBooking, replacementCabinet);
    }
}

public record AllocationResult(
    Cabinet AllocatedCabinet,
    Booking? BookingToSwap = null,
    Cabinet? ReplacementCabinet = null
);
