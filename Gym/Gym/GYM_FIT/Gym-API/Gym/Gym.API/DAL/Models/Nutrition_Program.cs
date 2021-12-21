using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DAL.Models
{
    public class Nutrition_Program
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string MealDescription { get; set; }
        public int ExcercisesCount { get; set; }
        public int Calories { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public User Coach { get; set; }
    }
}
