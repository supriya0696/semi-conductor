import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import * as dataa from 'src/assets/api/assets/postApi.json';
// let  postApiFile = require('../../assets/postApi.json');

@Injectable({ providedIn: 'root' })
export class UserService {
    private imageFetchDetails =  new BehaviorSubject('default msg');
    imageDetails = this.imageFetchDetails.asObservable();
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    post(data){
        let url = 'http://127.0.0.1:5000/api/post2'
        console.log(data)
       return this.http.post(url,data).pipe(map(res=> {
           console.log("data posted")
       }))
    }

    sendImageDetails(msg){
        this.imageFetchDetails.next(msg)
        localStorage.setItem('imageDetails',JSON.stringify(msg))
    }

    getImagesUploaded(){
        let url = 'http://127.0.0.1:5000/api/v1/resources/books/all'
        return this.http.get(url).pipe(map(res=>{
            return res
        }))
    }
}