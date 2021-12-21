using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.DTOs
{
    public class ProductCreateDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        [Range(0,double.MaxValue, ErrorMessage ="Please enter valid number")]
        public decimal Price { get; set; }
        [Required]
        [Range(0,int.MaxValue, ErrorMessage ="Please enter valid number")]
        public int CategoryID { get; set; }
        public IFormFile Image { get; set; }
        public Nullable<DateTime> ExpiryDate { get; set; }
    }
}
