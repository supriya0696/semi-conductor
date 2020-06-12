import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from 'src/app/helpers/fake-backend';
import { QueryParamsHandling } from '@angular/router/src/config';
import { AppComponent }  from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptors';
import { ErrorInterceptor } from './helpers/error.interceptors';
import { RegisterComponent } from './register/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { UserComponent } from './user/user/user.component';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { AboutComponent } from './about/about.component';
import { AlertService } from './services/alert.service';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { SafePipe } from './analytics/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    UserComponent,
    AnalyticsComponent,
    AboutComponent,
    ForgotPwdComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AlertService,APIService,AuthService,ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
