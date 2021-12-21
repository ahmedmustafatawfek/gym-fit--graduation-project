import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/_Models/Category';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = environment.apiURL + 'Categories/';

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.url+'GetCategories');
  }


}
