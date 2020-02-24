import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progressGreen: number = 20;
  progressBlue: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

  update(event: number){
    //this.progressBlue = event;
  }

}
