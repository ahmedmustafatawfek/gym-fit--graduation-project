using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gym.API.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym.API.DAL
{
    public class GymContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Nutrition_Program> Nutrition_Programs { get; set; }
        public DbSet<Models.Gym> Gyms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(connectionString: @"
                    data source=DESKTOP-TIT7H0U;
                 initial catalog=GymDB;
                 Integrated security=true;
                 user id = Samir;
                password=;
                ");
        }
    }
}
