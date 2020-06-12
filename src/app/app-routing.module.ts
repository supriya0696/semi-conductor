import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register/register.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { UserComponent } from './user/user/user.component';
import {Role} from 'src/app/model/role';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'changePassword', component: ForgotPwdComponent , },
    { path: 'main', component: HomeComponent , },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent},
    { 
      path: 'user', 
      component: UserComponent , 
      canActivate: [AuthGuard] , 
      // data: { roles: [Role.Admin] }
    },
    { path: 'analytics', component: AnalyticsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})









export class AppRoutingModule { }
