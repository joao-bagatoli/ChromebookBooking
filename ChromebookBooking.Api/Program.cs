using ChromebookBooking.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
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

app.UseCors("Dev");

app.UseAuthorization();

app.UseExceptionHandler();

app.MapControllers();

app.Run();
