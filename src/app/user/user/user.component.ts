import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { first } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usersStored: any =[]
  loading = false;
  users: any=[]
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
        this.usersStored = localStorage.getItem("users"); 
        this.usersStored=JSON.parse(this.usersStored)
        console.log(this.usersStored)
  
}
deleteUser(e){
 let id : number = +(e.currentTarget.value)
 for(var i=0;i<this.usersStored.length;i++){
   if(this.usersStored[i].id === id){
   var dd = this.usersStored.splice(i,1)
   var pp  = localStorage.setItem("users",JSON.stringify(this.usersStored))
   console.log(dd)
   }
 }


}
}
// }