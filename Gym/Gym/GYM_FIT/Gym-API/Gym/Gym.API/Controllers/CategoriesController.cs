using AutoMapper;
using Gym.API.BL;
using Gym.API.DAL.Models;
using Gym.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gym.API.Controllers
{
    //[Authorize(Roles ="Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public CategoryManager categoryManager = new CategoryManager();
        private IWebHostEnvironment Environment;
        private readonly IMapper _mapper;

        public CategoriesController(IMapper mapper, IWebHostEnvironment environment)
        {
            _mapper = mapper;
            Environment = environment;
        }

        // GET: api/<CategoryController>
        [HttpGet("GetAllCategories")]
        public IActionResult Get()
        {
            var cats = categoryManager.GetCategories();
            var categories = _mapper.Map<List<CategoryViewDto>>(cats);
            return Ok(new { Categories = categories });
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cat = categoryManager.GetCategory(id);
            if (cat == null || cat.ID <= 0)
                return BadRequest(new { Message = "Category doesn't exist." });
            return Ok(new { Category = cat });
        }

        [HttpPost("Create")]
        public IActionResult CreateCategory(CreateCategoryDto categoryDto)
        {
            var catExists = categoryManager.GetCategoryByName(categoryDto.Name);
            if (catExists != null && catExists.ID > 0)
                return BadRequest(new { Message = "Category already exists." });
            var category = _mapper.Map<Category>(categoryDto);
            category = categoryManager.AddCategory(category);

            var response = new {
                Message = "Category added successifully.",
                Category = category
            };

            return Ok(response);
        }

        [HttpPost("Update")]
        public IActionResult UpdateCategory(CreateCategoryDto categoryDto)
        {
            var catExists = categoryManager.GetCategory(categoryDto.ID);
            if (catExists == null || catExists.ID <= 0)
                return BadRequest(new { Message = "Category doesn't exist." });
            var category = _mapper.Map<Category>(categoryDto);
            bool updated = categoryManager.UpdateCategory(category);
            return updated ? Ok(new { Message = "Category Updated Successifully." })
                : BadRequest(new { Message = "Couldn't Update Category." });
        }

        [HttpPost("ToggleCategory")]
        public IActionResult ToggleCategory(int id)
        {
            bool success = categoryManager.ToggleCategory(id);
            return success ? Ok(new { Message = "Category Updated Successifully." })
                : BadRequest(new { Message = "Couldn't Update Category." });
        }

        //User Endpoints

        [HttpGet("GetCategories")]
        public IActionResult GetCategories() 
        {
            var categories = categoryManager.GetCategories().Where(c => c.Deleted == false);
            var cats = _mapper.Map<List<CategoryViewDto>>(categories);
            var response = new {
                Categories = cats
            };

            return Ok(response);
        }



        private string UploadedFile(IFormFile image)
        {
            string uniqueFileName = null;

            if (image != null)
            {
                string uploadsFolder = Path.Combine(this.Environment.WebRootPath, "Images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

    }
}
