import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from 'src/app/helpers/fake-backend';
// import { QueryParamsHandling } from '@angular/router/src/config';
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
import { FormsModule } from '@angular/forms';
import { TableComponent } from './analytics/analytics/table/table.component';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angular4-social-login';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
// import { environment } from 'src/environment';

const client_id= "75289993072-090rha7hi2jicckftjrsl0h77pb0e4p5.apps.googleusercontent.com";
let config = new AuthServiceConfig([
  {
    id : GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(client_id)
  }
])


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
    SafePipe,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    SocialLoginModule.initialize(config),
    // BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserModule,
    FormsModule,
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
