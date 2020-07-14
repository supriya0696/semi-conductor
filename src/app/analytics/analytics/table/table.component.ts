import { Component, OnInit, Input ,} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { isNgTemplate } from '@angular/compiler';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import {todo} from 'src/app/analytics/analytics/table/todo';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[UserService]
})

export class TableComponent implements OnInit {
  @Input() data
  toDoListArray:todo[]=[];
  constructor(private userService :UserService) { }

  ngOnInit() {  
   this.userService.getTodoList().subscribe((res) => {
    this.toDoListArray = res
    console.log(res)
   })
  }

  onAdd(title){
    debugger
    let data={
      isChecked:false,
      title:title.value 
      
    }
    this.userService.addTitle(data);
    this.toDoListArray.push(data)
    title.value=null
  }
  onDelete(key){
    debugger
    for(var i=0;i<this.toDoListArray.length;i++){
      if(this.toDoListArray[i].title === key.title){
      var dd = this.toDoListArray.splice(i,1)
      this.userService.removeData(dd)
      }
    }
  }


}
