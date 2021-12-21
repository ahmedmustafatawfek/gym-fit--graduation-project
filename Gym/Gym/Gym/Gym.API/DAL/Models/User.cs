using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DAL.Models
{
    public class User
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public bool Gender { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Deleted { get; set; }
        public bool Active { get; set; }

        public int RoleID { get; set; }

        [ForeignKey(nameof(RoleID))]
        public Role Role { get; set; }
        public List<Order> Orders { get; set; }

        public List<Nutrition_Program> Programs { get; set; }
    }
}
