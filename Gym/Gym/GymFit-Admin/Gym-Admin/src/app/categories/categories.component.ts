import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import { Category } from 'app/_Models/Category';
import { FuncsService } from 'app/_services/funcs.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categories: Category[] = [];
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;
  constructor(public service: CategoryService, private sanitizer:DomSanitizer,
    private router:Router, public globalFuncs:FuncsService) { }

  ngOnInit() {
    this.categories = [];
    this.service.getCategories().subscribe(res => {
      this.categories = res['Categories'];
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers'
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
   }

   DeleteCategory(id:number){
     this.service.toggleCategory(id.toString()).subscribe(res =>{
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this.categories.find(s => s.ID == id).Deleted = !this.categories.find(s => s.ID == id).Deleted;
     }, err =>{
      this.globalFuncs.showNotification('top','center', err.error['Message'], 'danger');
     });
   }



}
