using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using ChromebookBooking.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddScoped<ICabinetService, CabinetService>();

        return services;
    }

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string is not configured.");

        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

        return services;
    }

    public static IServiceCollection AddExceptionHandler(this IServiceCollection services)
    {
        services.AddProblemDetails();

        services.AddExceptionHandler<ExceptionHandler>();

        return services;
    }
}
