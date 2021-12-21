using Gym.API.DAL;
using Gym.API.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gym.API.BL
{
    public class ProductManager
    {
        GymContext context = new GymContext();

        public List<Product> GetProducts()
        {
            return context.Products.ToList();
        }

        public Product GetProduct(int id)
        {
            return context.Products.FirstOrDefault(p => p.ID == id);
        }

        public Product AddProduct(Product product)
        {
            product.CreatedAt = DateTime.Now;
            product.UpdatedAt = DateTime.Now;
            var prod = context.Add(product);
            context.SaveChanges();
            return prod.Entity;
        }

        public bool UpdateProduct(Product product)
        {
            var prod = context.Products.FirstOrDefault(p => p.ID == product.ID);
            prod.Name = product.Name;
            prod.Price = product.Price;
            prod.ProductImage = product.ProductImage;
            prod.ExpiryDate = product.ExpiryDate;
            prod.Description = product.Description;
            prod.CategoryID = product.CategoryID;
            prod.UpdatedAt = DateTime.Now;
            return context.SaveChanges() > 0 ? true : false;
        }

        public bool ToggleProduct(int id)
        {
            var prod = context.Products.FirstOrDefault(p => p.ID == id);
            prod.Deleted = !prod.Deleted;
            return context.SaveChanges() > 0 ? true : false;
        }

        public int AddOrder(Order order) 
        {
            var added = context.Orders.Add(order);
            context.SaveChanges();
            return added.Entity.ID;
        }

       
    }
}
