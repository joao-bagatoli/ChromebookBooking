using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.ValueObjects;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    public Guid AuthUserId { get; private set; }

    public Email Email { get; private set; }

    [Required]
    public UserRole Role { get; private set; }

    [Required]
    public bool IsActive { get; private set; }

    private User() { }

    public User(string email, UserRole role)
    {
        Email = Email.Create(email);
        Role = role;
        IsActive = true;
    }

    public void Deactivate() => IsActive = false;

    public void Activate() => IsActive = true;

    public void ChangeRole(UserRole newRole) => Role = newRole;

    public void LinkSupabaseAccount(Guid authUserId) => AuthUserId = authUserId;
}
