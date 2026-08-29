using ChromebookBooking.Api.Domain.Common.Enums;
using ChromebookBooking.Api.Domain.Common.Exceptions;

namespace ChromebookBooking.Api.Domain.ValueObjects;

public sealed record ClassPeriod
{
    public int Id { get; }
    public string Name { get; } = string.Empty;
    public Shift Shift { get; }
    public TimeSpan StartTime { get; }
    public TimeSpan EndTime { get; }

    private ClassPeriod(int id, string name, Shift shift, TimeSpan startTime, TimeSpan endTime)
    {
        Id = id;
        Name = name;
        Shift = shift;
        StartTime = startTime;
        EndTime = endTime;
    }

    public static readonly ClassPeriod MorningFirst = new(1, "1ª Aula", Shift.Morning, new TimeSpan(7, 30, 0), new TimeSpan(8, 15, 0));
    public static readonly ClassPeriod MorningSecond = new(2, "2ª Aula", Shift.Morning, new TimeSpan(8, 15, 0), new TimeSpan(9, 0, 0));
    public static readonly ClassPeriod MorningThird = new(3, "3ª Aula", Shift.Morning, new TimeSpan(9, 0, 0), new TimeSpan(9, 45, 0));
    public static readonly ClassPeriod MorningFourth = new(4, "4ª Aula", Shift.Morning, new TimeSpan(10, 0, 0), new TimeSpan(10, 45, 0));
    public static readonly ClassPeriod MorningFifth = new(5, "5ª Aula", Shift.Morning, new TimeSpan(10, 45, 0), new TimeSpan(11, 30, 0));

    public static readonly ClassPeriod AfternoonFirst = new(6, "1ª Aula", Shift.Afternoon, new TimeSpan(13, 30, 0), new TimeSpan(14, 15, 0));
    public static readonly ClassPeriod AfternoonSecond = new(7, "2ª Aula", Shift.Afternoon, new TimeSpan(14, 15, 0), new TimeSpan(15, 0, 0));
    public static readonly ClassPeriod AfternoonThird = new(8, "3ª Aula", Shift.Afternoon, new TimeSpan(15, 0, 0), new TimeSpan(15, 45, 0));
    public static readonly ClassPeriod AfternoonFourth = new(9, "4ª Aula", Shift.Afternoon, new TimeSpan(16, 0, 0), new TimeSpan(16, 45, 0));
    public static readonly ClassPeriod AfternoonFifth = new(10, "5ª Aula", Shift.Afternoon, new TimeSpan(16, 45, 0), new TimeSpan(17, 30, 0));

    public static IReadOnlyCollection<ClassPeriod> GetAll() =>
    [
        MorningFirst, MorningSecond, MorningThird, MorningFourth, MorningFifth,
        AfternoonFirst, AfternoonSecond, AfternoonThird, AfternoonFourth, AfternoonFifth
    ];

    public static ClassPeriod FromId(int id)
    {
        ClassPeriod period = GetAll().FirstOrDefault(p => p.Id == id) 
            ?? throw new DomainException("Nenhum horário de aula encontrado"); ;
        return period;
    }
}
