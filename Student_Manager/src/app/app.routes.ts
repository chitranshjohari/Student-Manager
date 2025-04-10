import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './Register/registration/registration.component';

export const routes: Routes = [
{
  path:"login",
  component:LoginComponent
},
{
  path:"register",
  component:RegistrationComponent
}

];
