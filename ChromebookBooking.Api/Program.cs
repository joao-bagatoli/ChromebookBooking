using ChromebookBooking.Api.Configurations;
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

app.MapGet("/health", () => Results.Ok(new { status = "ok", timestamp = DateTime.UtcNow }));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
