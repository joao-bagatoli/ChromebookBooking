using ChromebookBooking.Api.Infrastructure;
using ChromebookBooking.Api.Interfaces;
using ChromebookBooking.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ChromebookBooking.Api.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
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

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
    {
        string origin = configuration["Cors:AllowedOrigin"]!;

        services.AddCors(options =>
        {
            options.AddPolicy("Dev", policy =>
            {
                policy.WithOrigins(origin!)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return services;
    }

    public static IServiceCollection AddSupabaseAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        string validIssuer = configuration["Supabase:ValidIssuer"] 
            ?? throw new InvalidOperationException("Supabase Valid Issuer is missing.");

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = validIssuer;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudience = "authenticated",
                    ClockSkew = TimeSpan.Zero
                };

                // DEBUG
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"\n[JWT ERROr] Auth Failed: {context.Exception.Message}\n");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("\n[JWT SUCCESS] Token validated with asymmetric keys!\n");
                        return Task.CompletedTask;
                    }
                };
            });

        services.AddAuthorization();

        return services;
    }
}
