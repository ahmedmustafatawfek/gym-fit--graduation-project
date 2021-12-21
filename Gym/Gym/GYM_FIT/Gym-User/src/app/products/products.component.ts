import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'app/_Models/Category';
import { Product } from 'app/_Models/Product';
import { AlertifyService } from 'app/_services/alertify.service';
import { CategoryService } from 'app/_services/category.service';
import { ProductService } from 'app/_services/product.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  allProducts:Product[]=[];
  categories:Category[];
  imageUrl:string = environment.imageURL;
  catID:number;
  cartItems:number[] =[];

  url:string;
  search:string;

 constructor(public service: ProductService, public categoryService:CategoryService, private alertify:AlertifyService ) { }

  ngOnInit() {
  
    this.service.getProducts().subscribe(res => {
      this.allProducts = res['Products'];
      this.products = this.allProducts;
      this.categoryService.getCategories().subscribe(res => {
        this.categories = res['Categories'];
      });
    });
  }


  filterCategories() {
    this.products = this.allProducts.filter(s => s.CategoryID == this.catID);
    if(this.catID == 0) this.products = this.allProducts;
  }

  AddToCart(ID:number) {
    localStorage.setItem('cart',ID+(localStorage.getItem('cart')!=null?',' +localStorage.getItem('cart'):'') );
    this.alertify.success('Product added to shopping cart')
  }

  Search() {
    console.log('change happened')
    this.products = this.allProducts.filter(p => p.Name.toLowerCase().includes(this.search.toLowerCase()) || p.Price.toString().includes(this.search.toLowerCase()));
  }
}
