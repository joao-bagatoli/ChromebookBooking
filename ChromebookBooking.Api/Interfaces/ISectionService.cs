using ChromebookBooking.Api.DTOs;

namespace ChromebookBooking.Api.Interfaces;

public interface ISectionService
{
    Task<IReadOnlyList<SectionResponse>> GetAllSectionsAsync();
    Task<SectionResponse> GetSectionByIdAsync(int id);
    Task<SectionResponse> CreateSectionAsync(CreateSectionRequest request);
    Task UpdateSectionAsync(int id, UpdateSectionRequest request);
    Task DeleteSectionAsync(int id);
}
