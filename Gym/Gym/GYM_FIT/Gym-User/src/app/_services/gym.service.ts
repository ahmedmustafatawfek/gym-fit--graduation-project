import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/_Models/Product';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GymService {
  url:string = environment.apiURL + 'Gyms/';

  constructor(private http:HttpClient) { }

  getGyms(){
    return this.http.get<Product[]>(this.url+'GetGyms');
  }
}
