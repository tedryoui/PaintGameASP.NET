using Microsoft.EntityFrameworkCore;
using PaintWebApp.Models.Objects;

namespace PaintWebApp.Models
{
    public class PaintDbContext : DbContext
    {
        public DbSet<TextObj> Texts { get; set; }
        public DbSet<CurveObj> Curves { get; set; }
        public DbSet<NoteObj> Notes { get; set; }
        
        public PaintDbContext(DbContextOptions<PaintDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}