using ChromebookBooking.Api.Domain.Common.Constants;
using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Tests.Domain;

public class UserTests
{
    private static Email CreateValidEmail()
    {
        return Email.Create("teste@edu.joinville.sc.gov.br");
    }

    [Fact]
    public void Constructor_Should_Create_User_With_Valid_Email_And_Role()
    {
        // Arrange
        var email = CreateValidEmail();
        var role = UserRole.Teacher;

        // Act
        var user = new User(email, role);

        // Assert
        Assert.Equal(email, user.Email);
        Assert.Equal(role, user.Role);
        Assert.True(user.IsActive);
        Assert.Null(user.AuthUserId);
    }

    [Theory]
    [InlineData(false)]
    [InlineData(true)]
    public void SetStatus_Should_Update_IsActive(bool isActive)
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);

        // Act
        user.SetStatus(isActive);

        // Assert
        Assert.Equal(isActive, user.IsActive);
    }

    [Fact]
    public void ChangeRole_Should_Update_UserRole()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);
        var newRole = UserRole.Admin;

        // Act
        user.ChangeRole(newRole);

        // Assert
        Assert.Equal(newRole, user.Role);
        Assert.False(user.IsTeacher);
    }

    [Fact]
    public void ChangeRole_Should_Clear_Sections_When_Changing_From_Teacher_To_Admin()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);
        var sections = new List<Section>{ 
            new Section("1º A"), 
            new Section("2º B"), 
            new Section("3º C") 
        };
        user.UpdateSections(sections);

        // Act
        user.ChangeRole(UserRole.Admin);

        // Assert
        Assert.Empty(user.Sections);
    }

    [Fact]
    public void UpdateSections_NonTeacher_Should_Throw_Exception()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Admin);
        var sections = new List<Section>{ 
            new Section("1º A"), 
            new Section("2º B") 
        };

        // Act & Assert
        Assert.Throws<DomainException>(() => user.UpdateSections(sections));
    }

    [Fact]
    public void LinkSupabaseAccount_Should_Set_AuthUserId()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);
        var authUserId = Guid.NewGuid();

        // Act
        user.LinkSupabaseAccount(authUserId);

        // Assert
        Assert.Equal(authUserId, user.AuthUserId);
    }

    [Fact]
    public void GetAccessibleModules_Teacher_Should_Return_Schedule_Module()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);

        // Act
        var modules = user.GetAccessibleModules();

        // Assert
        Assert.Single(modules);
        Assert.Contains(AppModules.Schedule, modules);
    }

    [Fact]
    public void GetAccessibleModules_Admin_Should_Return_All_Modules()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Admin);

        // Act
        var modules = user.GetAccessibleModules();

        // Assert
        Assert.Equal(AppModules.All, modules);
    }
}
