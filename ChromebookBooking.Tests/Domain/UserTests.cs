using ChromebookBooking.Api.Domain.Common.Constants;
using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Tests.Domain;

public class UserTests
{
    private static Email CreateValidEmail()
    {
        return Email.Create("teste@escola.com");
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

    [Fact]
    public void Deactivate_Should_Set_IsActive_To_False()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);

        // Act
        user.Deactivate();

        // Assert
        Assert.False(user.IsActive);
    }

    [Fact]
    public void Activate_Should_Set_IsActive_To_True()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);
        user.Deactivate();

        // Act
        user.Activate();

        // Assert
        Assert.True(user.IsActive);
    }

    [Fact]
    public void ChangeRole_Should_Update_User_Role()
    {
        // Arrange
        var user = new User(CreateValidEmail(), UserRole.Teacher);
        var newRole = UserRole.Admin;

        // Act
        user.ChangeRole(newRole);

        // Assert
        Assert.Equal(newRole, user.Role);
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
