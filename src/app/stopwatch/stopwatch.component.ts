import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { TimerInterface } from '../timer/timer.component';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor() { }

  @ViewChild(MatTable) table: MatTable<StopwatchInterface> | undefined;
  
  hour:number = 0
  min:number = 0
  sec:number = 0
  mini:number = 0
  srNo:number = 1
  
  color:string = "primary"
  start:string = "start"

  isPause:boolean = false;
  pause:boolean = true;
  sw:boolean = false
  q:boolean = false;
  spilit:boolean = false;
  handle:any
  tempPauseDate:Date = new Date()

  dataSource:StopwatchInterface[] = []
    
  displayedColumns:String[] = ["srNo", "msg", "time", "gap"]

  startTime():void {
    if(!this.sw){
      this.color = ""
      this.start = "pause";
      this.sw = true;
      this.pause = false;
      this.q = true;
      this.spilit = false;
      let watch:Date = new Date();
      let gapTemp:Date = new Date();
      this.handle = setInterval(()=>{
        if(!this.pause){
          let tempTime:Date = new Date();
          let temp:number = 0;
          if(this.q){
            temp = tempTime.getTime() - watch.getTime();
          } else{
            gapTemp = new Date(gapTemp.getTime() + new Date().getTime() - this.tempPauseDate?.getTime());
            watch = new Date(new Date().getTime() - 
                            (this.hour * 60 * 60 *1000 + this.min * 60 *1000 +
                              this.sec*1000 + this.mini))
            this.q = true;
            temp = tempTime.getTime() - watch.getTime();
          }
          this.mini = temp%1000;
          temp /= 1000;
          this.sec = Math.floor(temp%60);
          temp /= 60;
          this.min = Math.floor(temp%60);
          temp /= 60;
          this.hour = Math.floor(temp);
          if(this.spilit){
            this.spilit = false;
            let gTemp = tempTime.getTime() - gapTemp.getTime();
            let gmini = gTemp%1000;
            gTemp /= 1000;
            let gsec = Math.floor(gTemp%60);
            gTemp /= 60;
            let gmin = Math.floor(gTemp%60);
            gTemp /= 60;
            let ghour = Math.floor(gTemp);
            gapTemp = new Date();
            this.dataSource.push(
              {srNo: this.srNo++, msg:"split",
                time: {hour:this.hour, min: this.min, sec: this.sec, mini:this.mini},
                gap:{hour:ghour, min: gmin, sec: gsec, mini:gmini}})
            this.table?.renderRows()
          }
        } else if(this.isPause) {
          this.isPause = false;
          this.dataSource.push(
            {srNo: this.srNo++, msg:"pause",
              time: {hour:this.hour, min: this.min, sec: this.sec, mini:this.mini},
              gap:{hour:0, min: 0, sec: 0, mini:0}})
          this.table?.renderRows()
        }
      }, 50);
    } else {
      if(!this.pause) {
        this.tempPauseDate = new Date()
        this.q = false;
        this.pause = true;
        this.color = "primary"
        this.start = "start";
        this.isPause = true
      } else {
        this.spilit = false
        this.pause = false
        this.color = ""
        this.start = "pause";
      }
    }
  }
  
  splitTime():void {
    this.spilit = true;
  }

  resetTime():void {
    this.hour = 0
    this.min = 0
    this.sec = 0
    this.mini = 0
    this.color = "primary"
    this.start = "start"
    this.pause = true;
    this.sw = false
    this.q = false;
    this.spilit = false;
    this.srNo = 1;
    this.dataSource = []
    this.isPause = false;
    clearInterval(this.handle)
  }

  ngOnInit(): void {
  }

}

export interface StopwatchInterface {
  srNo:number,
  time:TimerInterface,
  gap:TimerInterface,
  msg:string
}