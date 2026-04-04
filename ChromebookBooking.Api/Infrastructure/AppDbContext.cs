using ChromebookBooking.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Cabinet> Cabinets { get; set; }
}
