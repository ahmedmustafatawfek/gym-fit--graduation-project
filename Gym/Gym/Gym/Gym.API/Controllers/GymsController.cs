using AutoMapper;
using Gym.API.BL;
using Gym.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        public GymsController(IMapper mapper)
        {
            _mapper = mapper;
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
        public IActionResult CreateGym(GymCreateDto gymModel)
        {
            var gym = _mapper.Map<DAL.Models.Gym>(gymModel);
            gym = gymManager.AddGym(gym);

            var response = new
            {
                Message = "Gym Created Successifully",
                Gym = gym
            };

            return Ok(response);
        }

        [HttpPost("Update")]
        public IActionResult UpdateGym(GymCreateDto gymModel)
        {
            var gymExists = gymManager.GetGym(gymModel.ID);
            if (gymExists == null || gymExists.ID <= 0)
                return BadRequest(new { Message = "Gym deosn't exist" });
            var gym = _mapper.Map<DAL.Models.Gym>(gymModel);
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

    }
}
