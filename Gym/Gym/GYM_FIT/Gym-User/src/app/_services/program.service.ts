import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from 'app/_Models/Program';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  url:string = environment.apiURL + 'Programs/';

  constructor(private http:HttpClient) { }

  getPrograms(){
    return this.http.get<Program[]>(this.url+'GetPrograms');
  }
}
