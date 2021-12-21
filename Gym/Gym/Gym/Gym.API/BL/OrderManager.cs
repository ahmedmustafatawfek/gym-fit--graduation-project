using Gym.API.DAL;
using Gym.API.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gym.API.BL
{
    public class OrderManager
    {
        GymContext context = new GymContext();

        public List<Order> GetOrders(bool deleted = false)
        {
            return context.Orders.Where(o => o.Deleted == deleted).ToList();
        }

        public Order GetOrder(int id)
        {
            return context.Orders.Include(o => o.OrderDetails).FirstOrDefault(o => o.ID == id);
        }

        public int AddOrder(Order order)
        {
            var ord = context.Orders.Add(order);
            return ord.Entity.ID;
        }
    }
}
