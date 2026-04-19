namespace ChromebookBooking.Api.Domain.Common.Constants;

public static class AppModules
{
    public const string Dashboard = "Dashboard";
    public const string Schedule = "Schedule";
    public const string History = "History";
    public const string Settings = "Settings";

    public static readonly IReadOnlyList<string> All = [
        Dashboard,
        Schedule,
        History,
        Settings
    ];
}
