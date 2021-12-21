using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class ProgramCreateDto
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string MealDescription { get; set; }
        [Required]
        public int ExcercisesCount { get; set; }
        [Required]
        public int Calories { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        public bool Deleted { get; set; }

        public double Price { get; set; }
    }
}
