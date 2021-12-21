import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CategoriesComponent } from './categories/categories.component';
import { Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import { MatFormField, MatFormFieldModule  } from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UserService } from './_services/user.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { UsersComponent } from './users/users.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { TokenInterceptorService } from './login/token-interceptor.service';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ModalModule } from './_modal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsComponent } from './Products/Products.component';
import { AddProductComponent } from './Products/add-Product/add-Product.component';
import { EditProductComponent } from './Products/edit-product/edit-product.component';
import { ProgramsComponent } from './programs/programs.component';
import { AddProgramComponent } from './programs/add-program/add-program.component';
import { EditProgramComponent } from './programs/edit-program/edit-program.component';
import { GymsComponent } from './Gyms/Gyms.component';
import { AddGymComponent } from './Gyms/add-gym/add-gym.component';
import { EditGymComponent } from './Gyms/edit-gym/edit-gym.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6w26RG9WZC25CiAf2wdjYclSBY-4AB7Q'
    }),
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    ModalModule,
    FormsModule,
    MatTooltipModule
  ],
  declarations: [												
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
      CategoriesComponent,
      CreateCategoryComponent,
      EditCategoryComponent,
      UsersComponent,
      EditUserComponent,
      CreateUserComponent,
      ResetPasswordComponent,
      DashboardComponent,
      ProductsComponent,
      AddProductComponent,
      EditProductComponent,
      ProgramsComponent,
      AddProgramComponent,
      EditProgramComponent,
      GymsComponent,
      AddGymComponent,
      EditGymComponent
   ],
  providers: [
    DatePipe,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
