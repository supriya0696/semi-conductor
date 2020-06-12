import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './alert.service'

import {ConfigService} from '../services/config.service'

import jwt_decode from 'jwt-decode';

import {Subject,Observable} from 'rxjs';

import {LoginComponent} from 'src/app/login/login.component'

// import { APIService } from './api.service';

@Injectable()
export class AuthService {

  
  constructor(private router: Router,
    
    ) { 
             
    }  
    
  }

