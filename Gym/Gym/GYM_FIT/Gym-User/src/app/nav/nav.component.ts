import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any ={};
  constructor(private router:Router) { }

  ngOnInit() {
    this.model.username = localStorage.getItem('name');
  }

  login() {
    console.log(this.model);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
