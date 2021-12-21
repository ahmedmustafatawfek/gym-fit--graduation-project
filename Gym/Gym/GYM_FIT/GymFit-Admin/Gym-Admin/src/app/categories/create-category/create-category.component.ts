import { Component, OnInit } from '@angular/core';
import { Category } from 'app/_Models/Category';
import { CategoryService } from 'app/_services/category.service';
import {Location} from '@angular/common';
import { FuncsService } from 'app/_services/funcs.service';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  category: Category = {};
  constructor(public service:CategoryService, private _location:Location, public globalFuncs:FuncsService) { }

  ngOnInit() {
  }

  OnSubmit() {

    this.service.createCategory(this.category).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    },
    err=> {
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });

  }

  
}
