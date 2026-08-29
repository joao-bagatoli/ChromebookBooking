using ChromebookBooking.Api.Domain.Common.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class Booking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    public DateOnly Date { get; private set; }

    [Required]
    public int ClassPeriodId { get; private set; }

    [Required]
    public int CabinetId { get; private set; }
    public Cabinet? Cabinet { get; private set; }

    [Required]
    public int TeacherId { get; private set; }
    public User? Teacher { get; private set; }

    [Required]
    public int SectionId { get; private set; }
    public Section? Section { get; private set; }

    [Required]
    public bool IsPartial { get; private set; }

    [Required]
    public bool IsCancelled { get; private set; }

    [Required]
    public DateTime CreatedAt { get; private set; }

    private Booking() { }

    public Booking(DateOnly date, int classPeriodId, int cabinetId, int teacherId, int sectionId, bool isPartial = false)
    {
        Date = date;
        ClassPeriodId = classPeriodId;
        CabinetId = cabinetId;
        TeacherId = teacherId;
        SectionId = sectionId;
        IsPartial = isPartial;
        IsCancelled = false;
        CreatedAt = DateTime.UtcNow;
    }

    public void Cancel()
    {
        if (IsCancelled)
        {
            throw new DomainException("Esta reserva já está cancelada");
        }
        IsCancelled = true;
    }
}
