import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Product } from 'app/_Models/Product';
import { ModalService } from 'app/_modal';
import { ProductService } from 'app/_services/product.service';
import { FuncsService } from 'app/_services/funcs.service';
import { Subject } from 'rxjs';
import { Category } from 'app/_Models/Category';
import { CategoryService } from 'app/_services/category.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Product[];
  categories:Category[];
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  url:string;

 constructor(public service: ProductService, public categoryService:CategoryService ,public globalFuncs:FuncsService, public modalService:ModalService) { }

  ngOnInit() {
    this.products = [];
    this.service.getProducts().subscribe(res => {
      this.products = res['Products'];
      this.categoryService.getCategories().subscribe(res => {
        this.categories = res['Categories'];
      });
      this.dtTrigger.next();
    });
  }

  DeleteProduct(id:number){
    this.service.toggleProduct(id.toString()).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this.products.find(s=>s.ID == id).Deleted = !this.products.find(s=>s.ID == id).Deleted;
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
      
    });
  }

  getCatName(id) {
    return this.categories.find(c => c.ID == id).Name;
  }

  viewImage(imageName) {
    this.url = environment.imagesUrl +  imageName;
    console.log(this.url)
    this.modalService.open('view-Image');
  }

}
