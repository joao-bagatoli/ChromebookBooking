namespace ChromebookBooking.Api.DTOs;

public sealed record CreateCabinetRequest(string Name);

public sealed record UpdateCabinetRequest(
    string Name,
    bool IsActive
);

public sealed record CabinetResponse(
    int Id,
    string Name,
    bool IsActive
);

public sealed record CabinetStatus(
    int Id,
    string Name,
    CabinetStatusType Status
);

public enum CabinetStatusType
{
    Available,
    Booked,
    Inactive
}

public sealed record CabinetsOverviewResponse(
    CurrentClassPeriod CurrentClassPeriod,
    IReadOnlyList<CabinetStatus> CabinetStatuses
);