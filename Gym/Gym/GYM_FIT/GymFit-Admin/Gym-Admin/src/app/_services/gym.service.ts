import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gym } from 'app/_Models/Gym';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GymService {
  url:string = environment.apiURL+'Gyms/';
  constructor(private http:HttpClient) { 
   
  }

  

  getGyms(){
    return this.http.get(this.url+'GetAllGyms');
  }

  getGymById(id:string){
    return this.http.get(this.url+id);
  }

  addGym(gym:Gym){

    let formData = new FormData();
    if(gym.Name) formData.append('Name', gym.Name);
    if(gym.Description) formData.append('Description', gym.Description);
    if(gym.Address) formData.append('Address', gym.Address);
    if(gym.Mobile) formData.append('Mobile',gym.Mobile);
    if(gym.Price) formData.append('Price', gym.Price.toString());
    if(gym.Image) formData.append('Image', gym.Image);

    console.log('picture')
    return this.http.post(this.url+'Create',formData);
  }
  updateGym(gym:Gym){
    let formData = new FormData();
    formData.append('ID',gym.ID.toString());
    if(gym.Name) formData.append('Name', gym.Name);
    if(gym.Description) formData.append('Description', gym.Description);
    if(gym.Address) formData.append('Address', gym.Address);
    if(gym.Mobile) formData.append('Mobile',gym.Mobile);
    if(gym.Price) formData.append('Price', gym.Price.toString());
    if(gym.Image) formData.append('Image', gym.Image);
    return this.http.post(this.url+'Update', formData);
  }

  toggleGym(id:string){
    return this.http.post(this.url+'ToggleGym', null,{params:{
      id: id
    }});
  }

}
