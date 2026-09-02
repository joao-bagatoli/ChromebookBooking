using ChromebookBooking.Api.Domain.Common.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChromebookBooking.Api.Domain.Entities;

public sealed class ClassPeriod
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [StringLength(50)]
    public string Name { get; private set; } = string.Empty;

    [Required]
    public Shift Shift { get; private set; }

    [Required]
    public TimeOnly StartTime { get; private set; }

    [Required]
    public TimeOnly EndTime { get; private set; }

    private ClassPeriod() { }

    public ClassPeriod(string name, Shift shift, TimeOnly startTime, TimeOnly endTime)
    {
        Name = name;
        Shift = shift;
        StartTime = startTime;
        EndTime = endTime;
    }
}
