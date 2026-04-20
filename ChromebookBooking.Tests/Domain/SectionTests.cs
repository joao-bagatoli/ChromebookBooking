using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;

namespace ChromebookBooking.Tests.Domain;

public class SectionTests
{
    [Fact]
    public void Constructor_Should_Create_Section_With_Valid_Name()
    {
        // Arrange
        string name = "1º A";

        // Act
        var section = new Section(name);

        // Assert
        Assert.Equal(name, section.Name);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Constructor_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => new Section(invalidName));
    }

    [Fact]
    public void UpdateName_Should_Change_Name_When_Valid()
    {
        // Arrange
        var section = new Section("1º B");
        string newName = "1º C";

        // Act
        section.UpdateName(newName);

        // Assert
        Assert.Equal(newName, section.Name);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void UpdateName_Should_Throw_Exception_For_Invalid_Name(string invalidName)
    {
        // Arrange
        var section = new Section("1º D");

        // Act & Assert
        Assert.Throws<DomainException>(() => section.UpdateName(invalidName));
    }
}
