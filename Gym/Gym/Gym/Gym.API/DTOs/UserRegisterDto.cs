using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class UserRegisterDto
    {
        public string FullName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage ="Email is invalid")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        [Required]
        public bool Gender { get; set; }
        public DateTime Birthdate { get; set; }
        [Required]
        public int RoleID { get; set; }
    }
}
