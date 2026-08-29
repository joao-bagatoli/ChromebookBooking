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
        var section = new Section(name);

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
        Assert.Throws<DomainException>(() => new Section(invalidName));
    }

    [Fact]
    public void Update_Should_Change_Properties_When_Valid()
    {
        // Arrange
        var section = new Section("1º B");
        string newName = "1º C";
        bool newActiveStatus = false;

        // Act
        section.Update(newName, newActiveStatus);

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
        var section = new Section("1º D");

        // Act & Assert
        Assert.Throws<DomainException>(() => section.Update(invalidName, true));
    }
}
