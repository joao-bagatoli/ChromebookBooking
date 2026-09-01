using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Tests.Domain;

public class BookingTests
{
    private readonly DateOnly _defaultDate = new DateOnly(2026, 8, 29);
    private readonly int _classPeriodId = 1;
    private readonly int _cabinetId = 1;
    private readonly int _teacherId = 10;
    private readonly int _sectionId = 99;

    [Fact]
    public void Constructor_Should_Create_Full_Booking_Successfully()
    {
        // Act
        var booking = new Booking(_defaultDate, _classPeriodId, _cabinetId, _teacherId, _sectionId);

        // Assert
        Assert.False(booking.IsPartial);
        Assert.Null(booking.ChromebooksQuantity);
        Assert.False(booking.IsCancelled);
    }

    [Fact]
    public void Constructor_Should_Create_Partial_Booking_Successfully()
    {
        // Act
        var booking = new Booking(_defaultDate, _classPeriodId, _cabinetId, _teacherId, _sectionId, isPartial: true, chromebooksQuantity: 15);

        // Assert
        Assert.True(booking.IsPartial);
        Assert.Equal(15, booking.ChromebooksQuantity);
        Assert.False(booking.IsCancelled);
    }

    [Theory]
    [InlineData(null)]
    [InlineData(0)]
    [InlineData(-5)]
    public void Constructor_Should_Throw_Exception_When_Partial_Booking_Has_Invalid_Quantity(int? invalidQuantity)
    {
        // Act
        var action = () => new Booking(
            _defaultDate, 
            _classPeriodId, 
            _cabinetId, 
            _teacherId, 
            _sectionId, 
            isPartial: true, 
            chromebooksQuantity: invalidQuantity);

        // Assert
        Assert.Throws<DomainException>(action);
    }

    [Fact]
    public void Constructor_Should_Throw_Exception_When_Full_Booking_Has_Quantity()
    {
        // Act
        var action = () => new Booking(
            _defaultDate,
            _classPeriodId,
            _cabinetId,
            _teacherId,
            _sectionId,
            isPartial: false,
            chromebooksQuantity: 15);

        // Assert
        Assert.Throws<DomainException>(action);
    }

    [Fact]
    public void Cancel_Should_Set_IsCancelled_To_True()
    {
        // Arrange
        var booking = new Booking(_defaultDate, _classPeriodId, _cabinetId, _teacherId, _sectionId);

        // Act
        booking.Cancel();

        // Assert
        Assert.True(booking.IsCancelled);
    }
}
