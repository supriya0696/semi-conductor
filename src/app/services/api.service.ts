import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
// throwError(error.message || error);
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AlertService } from '../services/alert.service'
import { AuthService } from './auth.service';

@Injectable()
export class APIService {
  private static httpParam: HttpClient;
  static statusCodesHandled: boolean = false;
  static authErrorHandler: any;
  constructor(private http: HttpClient,
  ) {

  }

  static setAuthErrorHandler(authErrorHandler) {
    this.authErrorHandler = authErrorHandler;
  }
}
