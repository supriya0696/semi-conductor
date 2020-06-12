import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
    currentUser: User;
    userFromApi: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        // this.currentUser = this.authenticationService.currentUserValue;
        // this.userFromApi=this.currentUser
    }

    ngOnInit() {
      //  this.currentUser = this.authenticationService.currentUserValue;
      //   this.userFromApi=this.currentUser
        this.loading = true;
        this.userFromApi=localStorage.getItem('currentUser');
        console.log(this.userFromApi)
        debugger
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            // this.userFromApi = user;
        });
    }
}