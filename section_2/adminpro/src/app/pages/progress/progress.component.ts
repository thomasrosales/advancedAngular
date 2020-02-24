import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress: number = 50;

  constructor() { }

  ngOnInit(): void {
  }

  add(value: number){
    if(!value || value <= 0){
      this.progress = 0;
      return;
    }

    if(this.progress >= 100){
      this.progress = 100;
      return;
    }

    this.progress += value;
  }

  minus(value: number){
    if(!value || value >= 100){
      this.progress = 0;
      return;
    }

    this.progress += value;
    return;
  }

}
