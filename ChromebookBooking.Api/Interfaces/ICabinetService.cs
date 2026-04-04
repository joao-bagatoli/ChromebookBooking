using ChromebookBooking.Api.DTOs;

namespace ChromebookBooking.Api.Interfaces;

public interface ICabinetService
{
    Task<IReadOnlyList<CabinetResponse>> GetAllCabinetsAsync();
    Task<CabinetResponse> GetCabinetByIdAsync(int id);
    Task<CabinetResponse> CreateCabinetAsync(CreateCabinetRequest request);
    Task UpdateCabinetAsync(int id, UpdateCabinetRequest request);
    Task ActivateCabinetAsync(int id);
    Task DeactivateCabinetAsync(int id);
    Task DeleteCabinetAsync(int id);
}
