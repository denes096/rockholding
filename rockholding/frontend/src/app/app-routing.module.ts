import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ListComponent } from './modules/list/list.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'ingatlan/lista',
        component: ListComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'ingatlan/adatlap/:id',
        component: ProfileComponent,
        canActivate:[AuthGuard]
      }      
    ]
  },
  { path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
