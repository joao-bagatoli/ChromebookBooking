using ChromebookBooking.Api.Domain.Common.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class Section
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [StringLength(100)]
    public string Name { get; private set; } = string.Empty;

    // ALTER TABLE
    public bool? IsActive { get; private set; }

    private readonly List<User> _users = [];
    public IReadOnlyCollection<User> Users => _users.AsReadOnly();

    private Section() { }

    public Section(string name)
    {
        ValidateName(name);
        Name = name;
        IsActive = true;
    }
    
    public void Update(string name, bool isActive)
    {
        ValidateName(name);
        Name = name;
        IsActive = isActive;
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new DomainException("Nome da turma não pode ser nulo ou vazio");
        }
    }
}
