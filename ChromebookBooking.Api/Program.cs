using ChromebookBooking.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSupabaseAuthentication(builder.Configuration);
builder.Services.AddApiServices();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddExceptionHandler();
builder.Services.AddCorsPolicy(builder.Configuration);

var app = builder.Build();

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

app.Run();
