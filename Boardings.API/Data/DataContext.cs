
using Boardings.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boarding.API.Data
{
public class DataContext : DbContext{
   public DataContext(DbContextOptions<DataContext> options)
  : base(options){}
   public DbSet<Values> values {get; set;}
   public DbSet<User> Users {get; set;}

}}