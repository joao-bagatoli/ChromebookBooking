using ChromebookBooking.Api.Domain.Common.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class Cabinet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [StringLength(100)]
    public string Name { get; private set; } = string.Empty;

    [Required]
    public bool IsActive { get; private set; }

    private Cabinet() { }

    public Cabinet(string name)
    {
        ValidateName(name);
        Name = name;
        IsActive = true;
    }

    public void Deactivate() => IsActive = false;

    public void Activate() => IsActive = true;

    public void UpdateName(string newName)
    {
        ValidateName(newName);
        Name = newName;
    }

    private static void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new DomainException("Nome do gabinete não pode ser nulo ou vazio");
        }
    }
}
