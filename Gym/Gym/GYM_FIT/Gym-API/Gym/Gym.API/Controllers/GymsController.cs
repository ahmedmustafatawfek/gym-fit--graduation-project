using AutoMapper;
using Gym.API.BL;
using Gym.API.DTOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymsController : ControllerBase
    {
        private readonly IMapper _mapper;
        GymManager gymManager = new GymManager();
        private IWebHostEnvironment Environment;

        public GymsController(IMapper mapper, IWebHostEnvironment environment)
        {
            _mapper = mapper;
            Environment = environment;
        }

        [HttpGet("GetAllGyms")]
        public IActionResult GetAllGyms()
        {
            var gyms = gymManager.GetGyms();
            var response = new {
                Gyms = gyms
            };
            return Ok(response);
        }
        [HttpGet("GetGyms")]
        public IActionResult GetGyms()
        {
            var gyms = gymManager.GetGyms().Where(g => g.Deleted == false).ToList();
            var response = new
            {
                Gyms = gyms
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var gym = gymManager.GetGym(id);
            var response = new
            {
                Gym = gym
            };
            return Ok(response);
        }

        [HttpPost("Create")]
        public IActionResult CreateGym([FromForm]GymCreateDto gymModel)
        {
            var gym = _mapper.Map<DAL.Models.Gym>(gymModel);
            if (gymModel.Image != null && gymModel.Image.Length > 0)
            {
                gym.GymImage = UploadedFile(gymModel.Image);
            }
            gym = gymManager.AddGym(gym);

            var response = new
            {
                Message = "Gym Created Successifully",
                Gym = gym
            };

            return Ok(response);
        }

        [HttpPost("Update")]
        public IActionResult UpdateGym(int id,[FromForm]GymUpdateDto gymModel)
        {
            var gym = gymManager.GetGym(gymModel.ID);
            if (gym == null || gym.ID <= 0)
                return BadRequest(new { Message = "Gym deosn't exist" });
            if (gymModel.Name != null)
                gym.Name = gymModel.Name;
            if (gymModel.Price > 0)
                gym.Price = gymModel.Price;
            if (gymModel.Description != null)
                gym.Description = gymModel.Description;
            if (gymModel.Address != null)
                gym.Address = gymModel.Address;
            if (gymModel.Image != null && gymModel.Image.Length > 0)
            {
                gym.GymImage = UploadedFile(gymModel.Image);
            }

            bool updated = gymManager.UpdateGym(gym);

            return updated ? Ok(new { Message = "Gym updated successifully" })
                : BadRequest(new { Message = "Couldn't update gym" });
        }

        [HttpPost("ToggleGym")]
        public IActionResult ToggleCategory(int id)
        {
            bool success = gymManager.ToggleGym(id);
            return success ? Ok(new { Message = "Gym Updated Successifully." })
                : BadRequest(new { Message = "Couldn't Update Gym." });
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
