using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DAL.Models
{
    public class Gym
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Deleted { get; set; }
    }
}
