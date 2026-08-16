using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.Services;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Tests.Domain;

public class EmailAccessPolicyTests
{
    [Fact]
    public void EnsureIsAllowed_Should_Not_Throw_For_Allowed_Email()
    {
        // Arrange
        Email email = Email.Create("professor@edu.joinville.sc.gov.br");
        string[] bypassEmails = [];

        // Act & Assert
        EmailAccessPolicy.EnsureIsAllowed(email, bypassEmails);
    }

    [Fact]
    public void EnsureIsAllowed_Should_Throw_For_Disallowed_Email()
    {
        // Arrange
        Email email = Email.Create("professor@gmail.com");
        string[] bypassEmails = [];
        
        // Act & Assert
        Assert.Throws<DomainException>(() => EmailAccessPolicy.EnsureIsAllowed(email, bypassEmails));
    }

    [Fact]
    public void EnsureIsAllowed_Should_Not_Throw_For_Bypass_Email()
    {
        // Arrange
        Email email = Email.Create("admin@gmail.com");
        string[] bypassEmails = ["admin@gmail.com"];

        // Act & Assert
        EmailAccessPolicy.EnsureIsAllowed(email, bypassEmails);
    }

}
