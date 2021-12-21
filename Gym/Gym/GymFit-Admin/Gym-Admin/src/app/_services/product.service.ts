import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/_Models/Product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = environment.apiURL+'Products/';
  products:Product[];
  constructor(private http:HttpClient) { 
   
  }

  

  getProducts(){
    return this.http.get<Product[]>(this.url+'GetAllProducts');
  }

  getProductById(id:string){
    return this.http.get<Product>(this.url+id);
  }

  addProduct(product:Product){

    let formData = new FormData();
    if(product.Name) formData.append('Name', product.Name);
    if(product.Description) formData.append('Email', product.Description);
    if(product.CategoryID) formData.append('CategoryID', product.CategoryID.toString());
    if(product.Image) formData.append('Image', product.Image);
    if(product.ExpiryDate) formData.append('ExpiryDate',new Date(product.ExpiryDate).toUTCString());
    if(product.Price) formData.append('Price', product.Price.toString());


    return this.http.post(this.url+'Create',formData);
  }
  updateProduct(product:Product){
    let formData = new FormData();
    formData.append('ID',product.ID.toString());
    if(product.Name) formData.append('Name', product.Name);
    if(product.Description) formData.append('Description', product.Description);
    if(product.CategoryID) formData.append('CategoryID', product.CategoryID.toString());
    if(product.Image) formData.append('Image', product.Image);
    if(product.ExpiryDate) formData.append('ExpiryDate',new Date(product.ExpiryDate).toUTCString());
    if(product.Price) formData.append('Price', product.Price.toString());
    return this.http.post(this.url+'Update', formData);
  }

  toggleProduct(id:string){
    return this.http.post(this.url+'ToggleProduct', null,{params:{
      id: id
    }});
  }


}
