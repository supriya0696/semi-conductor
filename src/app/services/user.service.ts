import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
// import * as dataa from 'src/assets/api/assets/postApi.json';
// let  postApiFile = require('../../assets/postApi.json');
import {AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app'

@Injectable({ providedIn: 'root' })
export class UserService {
    todoList:AngularFireList<any>;
    constructor(private firebasedb: AngularFireDatabase,
        private http: HttpClient) { }

    private imageFetchDetails =  new BehaviorSubject('default msg');
    imageDetails = this.imageFetchDetails.asObservable();
  

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
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

    register(user: User) {
        const headers = new HttpHeaders({'Content-Type' : 'text/plain'})
        let url = 'http://127.0.0.1:5000/api/post2'
        return this.http.post(url, user).pipe(map(res=>{
            console.log("dTA POSTED")
        }));
    }
    getImagesUploaded(){
        let url = 'http://127.0.0.1:5000/api/v1/resources/books/all'
        return this.http.get(url).pipe(map(res=>{
            return res
        }))
    }

    getSearchData(text){
        const url="https://api.github.com/search/users?q="+text
        return this.http.get(url).pipe(map(res=>{
            return res
        }))
    }


    getTodoList(){
        let data
        debugger
        const url = "https://todoproject-d3e6c.firebaseio.com/titles.json"
        return this.http.get(url).pipe(map(responseData=>{
            console.log(responseData)
        //    data = res
            const response = [];
           for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
                response.push({...responseData[key]});
            }       
          }
          return response;
        }),
        catchError(errRes =>{
            return throwError(errRes);
          }))
      }
    
    addTitle(title){
        const data={isChecked:title.isChecked,title:title.title}
        const url = "https://todoproject-d3e6c.firebaseio.com/titles.json"
        this.http.post(url,JSON.stringify(data)).subscribe(res=>{
            console.log("posted successfully")
        },error =>{
            // this.error.next(error.error.error);
          })
    
      }

      checkTitle(key,flag){
          this.todoList.update(key,{isChecked:flag})
      }

      removeData(key){
          debugger
        const url = "https://todoproject-d3e6c.firebaseio.com/titles.json"
        this.http.delete(url,key.title).subscribe(res=>{
            console.log("deleted successfully")
        },error =>{
            // this.error.next(error.error.error);
          })
        // this.todoList.remove(key)
      }
}