import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService, GoogleLoginProvider} from 'angular4-social-login'

import {  AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from '../services/alert.service';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';

@Component({templateUrl: 'login.component.html',
selector: 'app-login',})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user:any

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private socailAuthServ: AuthService,
        // private 
    ) {
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['/main'];
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
      debugger
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  debugger
                    this.router.navigate(['/main']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    signInGoogle(platform : string){
        platform = GoogleLoginProvider.PROVIDER_ID
        this.socailAuthServ.signIn(platform).then(res=>{
            console.log(res)
            this.user=res;
        })

    }

    logout(){
        this.socailAuthServ.signOut();
        console.log("user signed")
    }
}