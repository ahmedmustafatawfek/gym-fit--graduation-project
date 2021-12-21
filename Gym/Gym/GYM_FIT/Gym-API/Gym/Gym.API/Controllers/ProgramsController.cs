using AutoMapper;
using Gym.API.BL;
using Gym.API.DAL.Models;
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
    public class ProgramsController : ControllerBase
    {
        private readonly IMapper _mapper;
        ProgramManager programManager = new ProgramManager();

        public ProgramsController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet("GetAllPrograms")]
        public IActionResult GetAllPrograms()
        {
            var programs = programManager.GetPrograms();
            var response = new
            {
                Programs = programs
            };
            return Ok(response);
        }
        [HttpGet("GetPrograms")]
        public IActionResult GetPrograms()
        {
            var programs = programManager.GetPrograms().Where(p => p.Deleted == false).ToList();
            var response = new
            {
                Programs = programs
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var program = programManager.GetProgram(id);
            var response = new
            {
                Program = program
            };
            return Ok(response);
        }

        [HttpPost("Create")]
        public IActionResult CreateProgram(ProgramCreateDto programModel)
        {
            var program = _mapper.Map<Nutrition_Program>(programModel);
            program = programManager.AddProgram(program);

            var response = new
            {
                Message = "Program Created Successifully",
                Program = program
            };

            return Ok(response);
        }

        [HttpPost("Update")]
        public IActionResult UpdateProgram(ProgramCreateDto programModel)
        {
            var programExists = programManager.GetProgram(programModel.ID);
            if (programExists == null || programExists.ID <= 0)
                return BadRequest(new { Message = "Program deosn't exist" });
            var program = _mapper.Map<Nutrition_Program>(programModel);
            bool updated = programManager.UpdateProgram(program);

            return updated ? Ok(new { Message = "Program updated successifully" })
                : BadRequest(new { Message = "Couldn't update program" });
        }

        [HttpPost("ToggleProgram")]
        public IActionResult ToggleCategory(int id)
        {
            bool success = programManager.ToggleProgram(id);
            return success ? Ok(new { Message = "Program Updated Successifully." })
                : BadRequest(new { Message = "Couldn't Update Program." });
        }
    }
}
