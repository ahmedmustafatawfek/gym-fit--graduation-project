import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/_Models/Category';
import { CategoryService } from 'app/_services/category.service';
import { FuncsService } from 'app/_services/funcs.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  category: Category = {};
  constructor(public service:CategoryService, public route:ActivatedRoute,
    private _location:Location, public globalFuncs:FuncsService) { }

  ngOnInit() {
    this.category.ID = this.route.snapshot.params['id'];
    this.service.getCategoryById(this.category.ID.toString()).subscribe(res => {
      this.category = res['Category'];
    }, 
    err=> {
      this.globalFuncs.showNotification('top','center', err.error['Message'], 'danger');
    });
  }

  async OnSubmit() {

    this.service.editCategory(this.category).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    },
    err=> {
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });

  }

  
}
