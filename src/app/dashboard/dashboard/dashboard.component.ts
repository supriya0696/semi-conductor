import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  imgSrc:any;
  file:any;
  // selectedFile:
  uploadImageData:any ={
    "fileName":'',
    "date_Time":Date,
    "userOpinion":null,
    "image":'',
    "uploadTime":''
  }

  timeTakenForImageToUpload:any =[];
  msg:any;
  imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
  decode:any
  constructor( public userService:UserService,
    private http: HttpClient ) {}

  ngOnInit() {
    
    this.userService.imageDetails.subscribe(res =>{
      this.msg=res
    })
  }

  uploadedFiles: any[] = [];

  

  onUpload(event) {
   let uploadTime =  Date.now();
   this.uploadedFiles = [];
   console.log(uploadTime)
    debugger
      for(let file of event.target.files) {
          this.uploadedFiles.push(file);
      }
      // this.saveImage(event)
      this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
      this.uploadImageData.fileName=this.file.name;
      this.uploadImageData.date_Time=uploadTime;
      var reader = new FileReader();     
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(this.file);
      let uploadendTime=Date.now()
      this.uploadImageData.uploadTime=uploadendTime-uploadTime;
      console.log(   this.timeTakenForImageToUpload)      
  }
  
  handleReaderLoaded(e) {
    let reader = e.target;
   this.imgSrc = reader.result;
   this.uploadImageData.image=this.imgSrc
    // console.log("base 64 converted Image-----------------------------",this.imgSrc)    
  }

  uploadData(e){
   this.uploadImageData.userOpinion = e.target.value ? e.target.value : ''
   console.log(this.uploadImageData)
   this.userService.post(this.uploadImageData).subscribe(res=>{
     console.log("data posted to server");
   })  
  
}
}
