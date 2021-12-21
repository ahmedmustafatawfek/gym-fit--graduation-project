using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class UserDto
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public bool Gender { get; set; }
        public DateTime Birthdate { get; set; }

        public int RoleID { get; set; }
    }
}
