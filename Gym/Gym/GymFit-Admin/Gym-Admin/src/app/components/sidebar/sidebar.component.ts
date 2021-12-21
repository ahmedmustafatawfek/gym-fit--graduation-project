import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/Dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    { path: '/Products', title: 'Manage Products',  icon: 'directions_car', class: '' },
    { path: '/Categories', title: 'Manage Categories',  icon:'category', class: '' },
    { path: '/Programs', title: 'Manage Programs',  icon:'category', class: '' },
    { path: '/Gyms', title: 'Manage Gyms',  icon:'category', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
