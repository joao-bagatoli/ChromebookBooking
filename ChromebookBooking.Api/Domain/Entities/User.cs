using ChromebookBooking.Api.Domain.Common.Constants;
using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.Common.Exceptions;
using ChromebookBooking.Api.Domain.ValueObjects;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    public Guid? AuthUserId { get; private set; }

    public Email Email { get; private set; }

    [Required]
    public UserRole Role { get; private set; }

    [Required]
    public bool IsActive { get; private set; }

    private readonly List<Section> _sections = [];
    public IReadOnlyCollection<Section> Sections => _sections.AsReadOnly();

    private User() { }

    public User(Email email, UserRole role)
    {
        Email = email;
        Role = role;
        IsActive = true;
    }

    public void ChangeRole(UserRole newRole)
    {
        if (Role == newRole)
            return;

        Role = newRole;

        if (!IsTeacher)
            ClearSections();
    }

    //public void Deactivate() => IsActive = false;

    //public void Activate() => IsActive = true;

    public void SetStatus(bool isActive) => IsActive = isActive;

    public void LinkSupabaseAccount(Guid authUserId) => AuthUserId = authUserId;

    public IReadOnlyList<string> GetAccessibleModules()
    {
        return Role switch
        {
            UserRole.Teacher => [AppModules.Schedule],
            UserRole.Admin => AppModules.All,
            _ => []
        };
    }

    public bool IsTeacher => Role == UserRole.Teacher;
    public bool IsAdmin => Role == UserRole.Admin;

    public void UpdateSections(IEnumerable<Section> sections)
    {
        if (!IsTeacher)
            throw new DomainException("Apenas usuários com o perfil de Professor podem ser vinculados a turmas.");

        ClearSections();
        _sections.AddRange(sections);
    }

    private void ClearSections()
    {
        _sections.Clear();
    }

}
