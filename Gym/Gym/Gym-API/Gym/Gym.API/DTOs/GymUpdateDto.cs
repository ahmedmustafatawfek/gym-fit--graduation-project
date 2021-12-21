using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class GymUpdateDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public string Mobile { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
    }
}
