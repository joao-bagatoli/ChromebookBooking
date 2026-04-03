using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Interfaces;

namespace ChromebookBooking.Api.Services;

public class CabinetService : ICabinetService
{
    public Cabinet AddCabinet()
    {
        var cabinet = new Cabinet("Teste");
        return cabinet;
    }
}
