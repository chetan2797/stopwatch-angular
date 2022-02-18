import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';
  flag:string = "timer"

  constructor(){
    if(location.pathname=='/stopwatch'){
      this.flag = "stopwatch";
    }
  }

  changeLink(link:string):void{
    this.flag=link
  }
}
