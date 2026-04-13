using ChromebookBooking.Api.Domain.Entities;
using ChromebookBooking.Api.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace ChromebookBooking.Api.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Cabinet> Cabinets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Email VO config
        modelBuilder.Entity<User>(builder =>
        {
            builder.Property(u => u.Email)
                   .HasConversion(
                       emailObj => emailObj.Value,
                       emailString => Email.Create(emailString))
                   .IsRequired()
                   .HasMaxLength(255);

            builder.HasIndex(u => u.Email)
                   .IsUnique();
        });
    }
}
