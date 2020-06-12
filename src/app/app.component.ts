import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { APIService } from './services/api.service';
import { User } from './model/user';
import { AuthenticationService } from './services/authentication.service';
import { Role } from './model/role';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

get isAdmin() {
  return this.currentUser && this.currentUser.role === Role.Admin;
}

}
