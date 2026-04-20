using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.ValueObjects;

namespace ChromebookBooking.Tests.Domain;

public class EmailTests
{
    [Fact]
    public void Create_Should_Return_Email_When_Valid()
    {
        // Arrange
        string validEmail = "professor@edu.joinville.sc.gov.br";

        // Act
        Email email = Email.Create(validEmail);

        // Assert
        Assert.Equal(validEmail, email.Value);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_Should_Throw_Exception_For_Empty_Email(string invalidEmail)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => Email.Create(invalidEmail));
    }

    [Theory]
    [InlineData("emailsemarroba.com")]
    [InlineData("@semprefixo.com")]
    [InlineData("usuario@")]
    [InlineData("usuario@dominio..com")]
    public void Create_Should_Throw_Exception_For_Invalid_Email(string invalidEmail)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => Email.Create(invalidEmail));
    }

    [Theory]
    [InlineData("professor@gmail.com")]
    [InlineData("diretor@hotmail.com")]
    [InlineData("professor@joinville.sc.gov.br")]
    public void Create_Should_Throw_Exception_For_Disallowed_Domain(string invalidEmail)
    {
        // Act & Assert
        Assert.Throws<DomainException>(() => Email.Create(invalidEmail));
    }

}
