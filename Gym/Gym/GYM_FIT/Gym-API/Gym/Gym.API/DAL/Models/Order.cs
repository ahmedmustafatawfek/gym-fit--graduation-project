using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym.API.DAL.Models
{
    public class Order
    {
        public int ID { get; set; }
        public int OrderDetailID { get; set; }
        public int CustomerID { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentType { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey(nameof(CustomerID))]
        public User Customer { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }
    }
}
