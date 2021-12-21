import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/_Models/Category';
import { Product } from 'app/_Models/Product';
import { CategoryService } from 'app/_services/category.service';
import { FuncsService } from 'app/_services/funcs.service';
import { ProductService } from 'app/_services/product.service';

@Component({
  selector: 'app-edit-Product',
  templateUrl: './edit-Product.component.html',
  styleUrls: ['./edit-Product.component.scss']
})
export class EditProductComponent implements OnInit {
  product:Product = {};
  categories: Category[];
  minDate = new Date();
  date: Date = new Date();
  constructor(private service:ProductService, private categoryService:CategoryService,public globalFuncs:FuncsService,
    private _location: Location, public route:ActivatedRoute) {
    this.product.ID = this.route.snapshot.params['id'];
      
      
      this.categoryService.getCategories().subscribe(res => {
        this.categories = res['Categories'];

        this.service.getProductById(this.product.ID.toString()).subscribe(res => {
          this.product = res['Product'];
    
        }, 
        err=> {
          this.globalFuncs.parseObject(err.error);
          if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
        });
      });

    
  }
  ngOnInit() {
  }


  OnSubmit(){
    console.log('update clicked')
    this.service.updateProduct(this.product).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }

  onSelectFile(file: any){
    this.product.Image = <File>file.target.files[0];
  }

}
