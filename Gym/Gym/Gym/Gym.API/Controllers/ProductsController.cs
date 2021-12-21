using AutoMapper;
using Gym.API.BL;
using Gym.API.DTOs;
using Gym.API.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public ProductManager productManager = new ProductManager();
        public CategoryManager categoryManager = new CategoryManager();
        private readonly IMapper _mapper;
        private IWebHostEnvironment Environment;

        public ProductsController(IMapper mapper, IWebHostEnvironment environment)
        {
            _mapper = mapper;
            Environment = environment;
        }

        // GET: api/<ProductsController>
        [HttpGet("GetAllProducts")]
        public IActionResult Get()
        {
            var prods = productManager.GetProducts();
            var products = _mapper.Map<List<ProductViewDto>>(prods);
            return Ok(new { Products = products});
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var prod = productManager.GetProduct(id);
            if (prod == null || prod.ID <= 0)
                return BadRequest(new { Message = "Product doesn't Exist." });
            return Ok(new { Product = prod });
        }

        // POST api/<ProductsController>
        [HttpPost("Create")]
        public IActionResult CreateProduct([FromForm] ProductCreateDto productDto)
        {
            var cat = categoryManager.GetCategory(productDto.CategoryID);
            if (cat == null || cat.ID <= 0)
                return BadRequest(new { message = "Category with ID ( "+ productDto.CategoryID+" ) doesn't exist." });
            var product = _mapper.Map<Product>(productDto);
            product.ProductImage = UploadedFile(productDto.Image);
            product = productManager.AddProduct(product);
            return Ok(new { Message = "Product Added Successifully", Product = product });
        }

        [HttpPost("Update")]
        public IActionResult UpdateProduct(int id, [FromForm] ProductUpdateDto productDto)
        {
            var cat = categoryManager.GetCategory(productDto.CategoryID);
            if (cat == null || cat.ID <= 0)
                return BadRequest(new { Message = "Category with ID ( " + productDto.CategoryID + " ) doesn't exist." });
            var prod = productManager.GetProduct(productDto.ID);
            if (prod == null || prod.ID <= 0)
                return BadRequest(new { Message = "Product doesn't exist." });

            if (productDto.Name != null)
                prod.Name = productDto.Name;
            if (productDto.Price > 0)
                prod.Price = productDto.Price;
            if (productDto.Description != null)
                prod.Description = productDto.Description;
            if (productDto.CategoryID > 0)
                prod.CategoryID = productDto.CategoryID;
            if (productDto.Image != null && productDto.Image.Length > 0)
            {
                prod.ProductImage = UploadedFile(productDto.Image);
            }
            if (productDto.ExpiryDate != null)
                prod.ExpiryDate = productDto.ExpiryDate;

            bool updated = productManager.UpdateProduct(prod);

            return updated ? Ok(new { Message = "Product updated successifully." })
                : BadRequest(new { Message = "Couldn't update product." });
        }

        [HttpPost("ToggleProduct")]
        public IActionResult ToggleProduct(int id)
        {
            bool success = productManager.ToggleProduct(id);
            return success ? Ok(new { Message = "Product updated successifully." })
                : BadRequest(new { Message = "Couldn't update product." });
        }


        [HttpGet("GetProducts")]
        public IActionResult GetProducts()
         {
            var products = productManager.GetProducts().Where(p => p.Deleted == false).ToList();
            var prods = _mapper.Map<List<ProductViewDto>>(products);
            var response = new { 
                Products = prods
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
