using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.Services;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Tests.Domain;

public class CabinetAllocatorTests
{
    private readonly CabinetAllocator _allocator;

    public CabinetAllocatorTests()
    {
        _allocator = new CabinetAllocator();
    }

    [Fact]
    public void Allocate_Should_Throw_DomainException_When_All_Cabinets_Are_Booked()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningFirst; // 1ª Aula
        int requestSectionId = 99; // Turma que deseja reservar

        // Apenas 1 gabinete disponível
        var activeCabinets = new List<Cabinet>
        {
            new Cabinet("Cabinet A")
        };

        int simulatedCabinetId = 0;

        // Já existe uma reserva ocupando o gabinete no mesmo período de aula
        var todaysBookings = new List<Booking>
        {
            new Booking(
                date: requestDate, 
                classPeriodId: requestClassPeriod.Id, 
                cabinetId: simulatedCabinetId, 
                teacherId: 10, 
                sectionId: 1)
        };

        // Act
        var action = () =>
            _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todaysBookings);

        // Assert
        Assert.Throws<DomainException>(action);
    }

    [Fact]
    public void Allocate_Should_Prioritize_Same_Cabinet_When_Section_Used_It_Earlier_Today()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningSecond; // 2ª Aula
        int requestSectionId = 99; // Turma 99

        var cabinetA = new Cabinet("Cabinet A");
        var cabinetB = new Cabinet("Cabinet B");

        cabinetA.GetType().GetProperty("Id")?.SetValue(cabinetA, 1);
        cabinetB.GetType().GetProperty("Id")?.SetValue(cabinetB, 2);

        var activeCabinets = new List<Cabinet> { cabinetA, cabinetB };

        // A turma 99 já usou o Cabinet B na 1ª aula deste mesmo dia
        var todayBookings = new List<Booking>
        {
            new Booking(
                requestDate, 
                classPeriodId: ClassPeriod.MorningFirst.Id, // 1ª Aula
                cabinetId: 2,
                teacherId: 10,
                sectionId: requestSectionId)
        };

        // Act
        var cabinet = _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todayBookings);

        // Assert
        Assert.NotNull(cabinet);
        Assert.Equal(2, cabinet.Id); // Embora o Cabinet A seja o primeiro da lista, o alocador deve reservar o B
        Assert.Equal("Cabinet B", cabinet.Name);
    }

    [Fact]
    public void Allocate_Should_Not_Assign_A_Cabinet_Already_Booked_In_The_Same_Period()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningFirst; // 1ª Aula
        int requestSectionId = 99;

        var cabinetA = new Cabinet("Cabinet A");
        var cabinetB = new Cabinet("Cabinet B");

        cabinetA.GetType().GetProperty("Id")?.SetValue(cabinetA, 1);
        cabinetB.GetType().GetProperty("Id")?.SetValue(cabinetB, 2);

        var activeCabinets = new List<Cabinet> { cabinetA, cabinetB };

        // Cabinet A já está ocupado na 1ª Aula por outra turma
        var todaysBooking = new List<Booking>
        {
            new Booking(
                requestDate,
                classPeriodId: requestClassPeriod.Id,
                cabinetId: 1,
                teacherId: 10,
                sectionId: 50)
        };

        // Act
        var cabinet = _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todaysBooking);

        // Assert
        Assert.NotNull(cabinet);
        Assert.Equal(2, cabinet.Id); // O alocador deve pular o Cabinet A, por estar ocupado
        Assert.Equal("Cabinet B", cabinet.Name);
    }

    [Fact]
    public void Allocate_Should_Ignore_Cancelled_Bookings_When_Calculating_Availability()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningFirst;
        int requestSectionId = 99;

        var cabinetA = new Cabinet("Cabinet A");
        cabinetA.GetType().GetProperty("Id")?.SetValue(cabinetA, 1);

        var activeCabinets = new List<Cabinet> { cabinetA };

        var cancelledBooking = new Booking(
            date: requestDate,
            classPeriodId: requestClassPeriod.Id, // Mesmo horário
            cabinetId: 1, // Cabinet A
            teacherId: 10,
            sectionId: 50);

        cancelledBooking.Cancel();

        var todaysBooking = new List<Booking> { cancelledBooking };

        // Act
        var cabinet = _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todaysBooking);

        // Assert
        Assert.NotNull(cabinet);
        Assert.Equal(1, cabinet.Id);
        Assert.Equal("Cabinet A", cabinet.Name);
    }

    [Fact]
    public void Allocate_Should_Prioritize_The_Most_Recently_Used_Cabinet_For_The_Section()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningThird; // Reservando a 3ª Aula
        int requestSectionId = 99;

        var cabinetA = new Cabinet("Cabinet A");
        var cabinetB = new Cabinet("Cabinet B");

        cabinetA.GetType().GetProperty("Id")?.SetValue(cabinetA, 1);
        cabinetB.GetType().GetProperty("Id")?.SetValue(cabinetB, 2);

        var activeCabinets = new List<Cabinet> { cabinetA, cabinetB };

        var todaysBookings = new List<Booking>
        {
            // Turma usou o Cabinet A na 1ª Aula
            new Booking(requestDate, ClassPeriod.MorningFirst.Id, cabinetId: 1, teacherId: 10, requestSectionId),
            
            // Turma usou o Cabinet B na 2ª Aula
            new Booking(requestDate, ClassPeriod.MorningSecond.Id, cabinetId: 2, teacherId: 10, requestSectionId)
        };

        // Act
        var cabinet = _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todaysBookings);

        // Assert
        Assert.NotNull(cabinet);
        Assert.Equal(2, cabinet.Id); // Deve ignorar o Cabinet A e alocar o B, pois foi o último utilizado
        Assert.Equal("Cabinet B", cabinet.Name);
    }

    [Fact]
    public void Allocate_Should_Fallback_To_Another_Cabinet_When_Previously_Used_Is_Occupied()
    {
        // Arrange
        var requestDate = new DateOnly(2026, 8, 29);
        var requestClassPeriod = ClassPeriod.MorningSecond; // Turma 99 tentando reservar a 2ª Aula
        int requestSectionId = 99;

        var cabinetA = new Cabinet("Cabinet A");
        var cabinetB = new Cabinet("Cabinet B");

        cabinetA.GetType().GetProperty("Id")?.SetValue(cabinetA, 1);
        cabinetB.GetType().GetProperty("Id")?.SetValue(cabinetB, 2);

        var activeCabinets = new List<Cabinet> { cabinetA, cabinetB };

        var todaysBookings = new List<Booking>
        {
            // A Turma 99 usou o Cabinet A na 1ª Aula (logo, ele se torna a preferência de continuidade)
            new Booking(
                date: requestDate,
                classPeriodId: ClassPeriod.MorningFirst.Id,
                cabinetId: 1,
                teacherId: 10,
                sectionId: requestSectionId),
                
            // Outro professor foi mais rápido e reservou o Cabinet A na 2ª Aula para a Turma 50
            new Booking(
                date: new DateOnly(2026, 8, 29),
                classPeriodId: ClassPeriod.MorningSecond.Id,
                cabinetId: 1,
                teacherId: 20,
                sectionId: 50)
        };

        // Act
        var cabinet = _allocator.Allocate(requestClassPeriod.Id, requestSectionId, activeCabinets, todaysBookings);

        // Assert
        Assert.NotNull(cabinet);
        Assert.Equal(2, cabinet.Id);
        Assert.Equal("Cabinet B", cabinet.Name);
    }
}
