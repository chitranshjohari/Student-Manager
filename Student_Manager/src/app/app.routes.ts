import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './Register/registration/registration.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
{
  path:"",
  component:LoginComponent
},
{
  path:"register",
  component:RegistrationComponent
},
{
  path:"admin",
  component:AdminComponent
}

];
