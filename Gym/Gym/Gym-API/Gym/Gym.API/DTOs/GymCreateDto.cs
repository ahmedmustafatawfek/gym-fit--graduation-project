using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class GymCreateDto
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string GymImage { get; set; }
        public string Mobile { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public IFormFile Image { get; set; }
    }
}
