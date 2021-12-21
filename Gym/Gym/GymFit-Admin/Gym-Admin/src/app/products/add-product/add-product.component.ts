import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from 'app/_services/product.service';
import { FuncsService } from 'app/_services/funcs.service';
import { Product } from 'app/_Models/Product';
import { CategoryService } from 'app/_services/category.service';
import { Category } from 'app/_Models/Category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product:Product = {};
  categories: Category[];
  minDate = new Date();
  date: Date = new Date();

  constructor(private service:ProductService, private categoryService:CategoryService, public globalFuncs:FuncsService,
    private _location: Location) {

     }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res["Categories"];
    });
  }

  OnSubmit(){
    this.service.addProduct(this.product).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      console.log(err);
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }
  onSelectFile(file: any){
    this.product.Image = <File>file.target.files[0];
  }

}
