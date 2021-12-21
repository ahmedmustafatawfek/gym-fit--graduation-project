import { Routes , RouterModule} from '@angular/router';

import { CategoriesComponent } from 'app/categories/categories.component';
import { CreateCategoryComponent } from 'app/categories/create-category/create-category.component';
import { EditCategoryComponent } from 'app/categories/edit-category/edit-category.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AddProductComponent } from 'app/Products/add-Product/add-Product.component';
import { ProductsComponent } from 'app/Products/Products.component';
import { EditProductComponent } from 'app/Products/edit-product/edit-product.component';
import { ProgramsComponent } from 'app/programs/programs.component';
import { AddProgramComponent } from 'app/programs/add-program/add-program.component';
import { EditProgramComponent } from 'app/programs/edit-program/edit-program.component';
import { GymsComponent } from 'app/Gyms/Gyms.component';
import { AddGymComponent } from 'app/Gyms/add-gym/add-gym.component';
import { EditGymComponent } from 'app/Gyms/edit-gym/edit-gym.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'Dashboard', component: DashboardComponent},
    { path: 'Products',      component: ProductsComponent },
    { path: 'Products/Add', component: AddProductComponent},
    { path: 'Products/Edit/:id', component: EditProductComponent},
    { path: 'Categories', component: CategoriesComponent},
    { path: 'Categories/Create', component: CreateCategoryComponent},
    { path: 'Categories/Edit/:id', component: EditCategoryComponent},
    { path: 'Programs', component: ProgramsComponent},
    { path: 'Programs/Add', component: AddProgramComponent},
    { path: 'Programs/Edit/:id', component: EditProgramComponent},
    { path: 'Gyms', component:GymsComponent},
    { path: 'Gyms/Add', component:AddGymComponent},
    { path: 'Gyms/Edit/:id', component:EditGymComponent}
];
