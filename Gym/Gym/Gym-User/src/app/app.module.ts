import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RegisterComponent } from './register/register.component';
import { MatFormField, MatFormFieldModule  } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './login/auth.guard';
import { TokenInterceptorService } from './login/token-interceptor.service';
import { UserService } from './_services/user.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { CoachesComponent } from './coaches/coaches.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { CartComponent } from './cart/cart.component';
import { GymsComponent } from './gyms/gyms.component';
import { ProgramsComponent } from './programs/programs.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [										
    AppComponent,
      NavComponent,
      RegisterComponent,
      ProgramsComponent,
      CoachesComponent,
      ProductsComponent,
      LoginComponent,
      CartComponent,
      GymsComponent,
      ProgramsComponent,
      ShoppingCartComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DatePipe,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    UserService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
