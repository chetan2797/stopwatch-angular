import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  date:Date = new Date();

  show:TimerInterface = {hour:0, min:2, sec:0, mini:0}
  hour:number = 0
  min:number = 2
  sec:number = 0
  mini:number = 0
  
  thour:number = 0
  tmin:number = 2
  tsec:number = 0
  tmini:number = 0
  
  timer:any
  flag:boolean = false
  sp:boolean = false

  color:string = "primary"
  start:string = "start"

  startTimer():void {
    if(!this.flag) {
      this.flag = true
      this.sp = true
      this.color = "accent"
      this.start = "pause"
      let start = new Date();
      let end = new Date(start.getTime())
      end.setHours(end.getHours()+this.thour)
      end.setMinutes(end.getMinutes()+this.tmin)
      end.setSeconds(end.getSeconds()+this.tsec)
      end.setMilliseconds(end.getMilliseconds()+this.tmini);
      this.timer = setInterval(() => {
        if(this.sp) {
          start = new Date()
          let temp = end.getTime()-start.getTime();
          this.mini = temp%1000;
          temp /= 1000;
          this.sec = Math.floor(temp%60);
          temp /= 60;
          this.min = Math.floor(temp%60);
          temp /= 60;
          this.hour = Math.floor(temp);
          if(start.getTime()>=end.getTime()){
            this.resetTimer()
            let audio = new Audio("/assets/beep.mp3");
            audio.volume = .5;
            audio.play();
          }
        }
      }, 50);
    } else {
      if(this.sp){
        this.sp = false;
        this.color = "primary"
        this.start = "start"
      } else {
        this.sp = true;
        this.color = "accent"
        this.start = "pause"
      }
    }
  }

  resetTimer() {
    this.color = "primary"
    this.start = "start"
    this.flag = false;
    this.sp = false;
    this.hour = this.thour
    this.min = this.tmin
    this.sec = this.tsec
    this.mini = this.tmini
    clearInterval(this.timer)
  }

  onSubmit():void{
    if(this.show.hour<0) {
      this.show.hour = 0
    }
    if(this.show.min<0 || this.show.mini>59) {
      this.show.min = 0
    }
    if(this.show.sec<0 || this.show.mini>59) {
      this.show.sec = 0
    }
    if(this.show.mini<0 || this.show.mini>999) {
      this.show.mini = 0
    }
    this.thour=this.show.hour
    this.tmin=this.show.min
    this.tsec=this.show.sec
    this.tmini=this.show.mini
    if(!this.flag) {
      this.hour = this.thour
      this.min = this.tmin
      this.sec = this.tsec
      this.mini = this.tmini
    }
  }
}

@Pipe({name: "timer"})
export class TimerPipe implements PipeTransform{
  transform(value: any, ...args: any[]) {
    let temp:string = value + "";
    if(temp.length==1){
      temp = "0"+ temp
    }
    return temp;
  }
}
@Pipe({name: "minitimer"})
export class MiniTimerPipe implements PipeTransform{
  transform(value: any, ...args: any[]) {
    let temp:string = value + "";
    if(temp.length==1){
      temp = "00"+ temp
    } else if(temp.length==2){
      temp = "0"+ temp
    }
    return temp;
  }
}

export interface TimerInterface{
  hour:number,
  min:number,
  sec:number,
  mini:number
}
