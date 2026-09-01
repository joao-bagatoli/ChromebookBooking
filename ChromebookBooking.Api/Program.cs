using ChromebookBooking.Api.Configurations;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Npgsql;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddOpenApi();
builder.Services.AddMemoryCache();

builder.Services.AddSupabaseAuthentication(builder.Configuration);
builder.Services.AddApiServices();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddExceptionHandler();
builder.Services.AddCorsPolicy(builder.Configuration);
builder.Services.AddSecuritySettings(builder.Configuration);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddHealthChecks()
    .AddCheck("database", () =>
    {
        try
        {
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();
            using var cmd = new NpgsqlCommand("SELECT 1", connection);
            cmd.ExecuteScalar();
            return HealthCheckResult.Healthy();
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy(exception: ex);
        }
    });

var app = builder.Build();

app.ApplyMigrations();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
else
{
    app.UseHttpsRedirection();
}

app.UseExceptionHandler();
app.UseCors("Dev");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// registra a rota do health check, liberada de autenticação
app.MapHealthChecks("/health").AllowAnonymous();

app.Run();