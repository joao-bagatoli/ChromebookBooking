using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Tests.Domain;

public class CabinetTests
{
    [Fact]
    public void Constructor_Should_Create_Cabinet_With_Valid_Name()
    {
        // Arrange
        string name = "Gabinete A";

        // Act
        var cabinet = new Cabinet(name);

        // Assert
        Assert.Equal(name, cabinet.Name);
        Assert.True(cabinet.IsActive);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Constructor_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => new Cabinet(invalidName));
    }

    [Fact]
    public void Deactivate_Should_Set_IsActive_To_False()
    {
        // Arrange
        var cabinet = new Cabinet("Gabinete B");

        // Act
        cabinet.Deactivate();

        // Assert
        Assert.False(cabinet.IsActive);
    }

    [Fact]
    public void Activate_Should_Set_IsActive_To_True()
    {
        // Arrange
        var cabinet = new Cabinet("Gabinete C");
        cabinet.Deactivate();

        // Act
        cabinet.Activate();

        // Assert
        Assert.True(cabinet.IsActive);
    }

    [Fact]
    public void UpdateName_Should_Change_Name_When_Valid()
    {
        // Arrange
        var cabinet = new Cabinet("Gabinete D");
        string newName = "Gabinete D Atualizado";

        // Act
        cabinet.UpdateName(newName);

        // Assert
        Assert.Equal(newName, cabinet.Name);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void UpdateName_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Arrange
        var cabinet = new Cabinet("Gabinete E");

        // Act & Assert
        Assert.Throws<DomainException>(() => cabinet.UpdateName(invalidName));
    }

}
