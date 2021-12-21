import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from 'app/_Models/Program';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  url:string = environment.apiURL+'Programs/';
  
  constructor(private http:HttpClient) { 
   
  }

  getPrograms(){
    return this.http.get(this.url+'GetAllPrograms');
  }

  getProgramById(id:string){
    return this.http.get<Program>(this.url+id);
  }

  addProgram(program:Program){
    return this.http.post(this.url+'Create',program);
  }

  updateProgram(program:Program){
    return this.http.post(this.url+'Update', program);
  }

  toggleProgram(id:string) {
    return this.http.post(this.url+'ToggleProgram', null,{params:{
      id: id
    }});
  }
}
