import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {
  forgotPwdForm:FormGroup ;
  loading = false;
  submitted = false;
  returnResult:any
  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
    }

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      username: ['', Validators.required],
      question: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
  });
  
  }
  get f() { return this.forgotPwdForm.controls; }



  onSubmit() {
    debugger

    this.submitted = true;

      // stop here if form is invalid
      if (this.forgotPwdForm.invalid) {
          return;
      }

      this.loading = true;
      localStorage.getItem('users')
     this.returnResult= this.authenticationService.save(this.f.username.value, this.f.confirmPassword.value)
        if(this.returnResult){
   debugger
          this.router.navigate(['/login']);
              
        }
            
             
  }
}
