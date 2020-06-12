import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    localstorageData:any=[]

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    save(username: string, password: string) {
        debugger
        this.localstorageData = localStorage.getItem("users"); 
        this.localstorageData=JSON.parse(this.localstorageData);
        for(var i=0;i<this.localstorageData.length;i++){
            if(this.localstorageData[i].username === username){
            var dd = this.localstorageData[i].password=password
            var pp  = localStorage.setItem("users",JSON.stringify(this.localstorageData))
            console.log(pp);
            return this.localstorageData
            }
          }
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      
        //     .pipe(map(user => {
        //         debugger
        //         // if (user && user.token) {
        //             this.localstorageData=localStorage.getItem('users');
        //             this.localstorageData.map(res=>{
        //                 res.filter(data=>{data.username === username}
        //                   ).pipe(res.password=password)
                      
        //             })
        //             this.currentUserSubject.next(user);
        //         // }

        //         return user;
        //     }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}