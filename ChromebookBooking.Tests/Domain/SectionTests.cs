using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Tests.Domain;

public class SectionTests
{
    [Fact]
    public void Constructor_Should_Create_Section_With_Valid_Name_And_Active_Status()
    {
        // Arrange
        string name = "1º A";

        // Act
        var section = new Section(name, Shift.Morning);

        // Assert
        Assert.Equal(name, section.Name);
        Assert.True(section.IsActive);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Constructor_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => new Section(invalidName, Shift.Morning));
    }

    [Fact]
    public void Update_Should_Change_Properties_When_Valid()
    {
        // Arrange
        var section = new Section("1º A", Shift.Morning);
        string newName = "1º B";
        Shift newShift = Shift.Afternoon;
        bool newActiveStatus = false;

        // Act
        section.Update(newName, newShift, newActiveStatus);

        // Assert
        Assert.Equal(newName, section.Name);
        Assert.Equal(newActiveStatus, section.IsActive);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Update_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Arrange
        var section = new Section("1º D", Shift.Afternoon);

        // Act & Assert
        Assert.Throws<DomainException>(() => section.Update(invalidName, Shift.Afternoon, true));
    }
}
