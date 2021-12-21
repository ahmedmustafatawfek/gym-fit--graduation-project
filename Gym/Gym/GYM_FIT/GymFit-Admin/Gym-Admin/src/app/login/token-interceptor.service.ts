import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  urlNotToUse: string[]= [
    environment.apiURL+'register',
    environment.apiURL+'drivers/DriverRegister'
  ];
    constructor() {

    }
  intercept(req, next) {
      if(this.urlNotToUse.indexOf(req.url)<0){
        let token = localStorage.getItem('token');
        let tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(tokenizedReq);
      }
      return next.handle(req);
    }
}
