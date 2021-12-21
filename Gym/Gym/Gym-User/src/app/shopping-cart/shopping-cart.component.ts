import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from 'app/_Models/Order';
import { OrderDetail } from 'app/_Models/OrderDetail';
import { Product } from 'app/_Models/Product';
import { AlertifyService } from 'app/_services/alertify.service';
import { ProductService } from 'app/_services/product.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartIds:number[];
  cartProducts: Product[]=[];
  products:Product[]=[];
  order: Order={};
  constructor(private service:ProductService,private alertify:AlertifyService, private _location:Location) { }

  ngOnInit() {
    var ids = localStorage.getItem('cart');
    this.cartIds = ids.split(',').map(i => +i);
    this.service.getProducts().subscribe(res => {
      this.products = res['Products'];
      this.cartProducts = this.products.filter(p => this.cartIds.includes(p.ID));
    });
  }

  getImage(img:string) {
    return environment.imageURL + img;
  }

  placeOrder() {
    this.order.OrderDetails = [];
    this.order.CustomerID = +localStorage.getItem('userId');
    this.order.OrderStatus = "Pending";
    this.order.PaymentType = "Cash";
    this.order.TotalPrice = this.cartProducts.reduce((sum ,current) =>  sum+current.Price,0);
    this.cartProducts.forEach(prod => {
      var orderDetail:OrderDetail={};
      orderDetail.ProductID = prod.ID;
      orderDetail.Quantity = 1;
      orderDetail.TotalPrice = prod.Price;
      this.order.OrderDetails.push(orderDetail);
    });

    this.service.placeOrder(this.order).subscribe(res=>{
      console.log(res);
      localStorage.removeItem('cart');
      this.alertify.success('Your Order Placed Successfully')
      this._location.back();
    },err=>{
      console.log(err);
    });
  }

}
