import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Category } from 'app/_Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = environment.apiURL + 'Categories/';

constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.url+'GetAllCategories');
  }


  createCategory(category: Category){
   
    
    return this.http.post(this.url+'Create', category);
  }

  editCategory(category: Category){
    
    return this.http.post(this.url+'Update', category, {params:{
      id : category.ID.toString()
    }});
  }
 

  getCategoryById(id:string){
    return this.http.get<Category>(this.url+id);
  }

  toggleCategory(id:string){
    const params = new HttpParams().set('id',id);
    return this.http.post(this.url+'ToggleCategory', null,{params:{
      id: id
    }});
  }

  
}
