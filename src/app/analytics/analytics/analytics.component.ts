import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analyticsData:any
  constructor(public userService:UserService,
    private dom : DomSanitizer) { }

  ngOnInit() {
    this.analyticsData = localStorage.getItem("imageDetails"); 
    this.analyticsData=JSON.parse(this.analyticsData);
     this.userService.getImagesUploaded().subscribe(res=>{
      this.analyticsData=res;
      // return this.dom.bypassSecurityTrustUrl(this.analyticsData)

     })
    
  }
  santize(image):SafeUrl{
    return this.dom.bypassSecurityTrustResourceUrl(image)
  }

}
