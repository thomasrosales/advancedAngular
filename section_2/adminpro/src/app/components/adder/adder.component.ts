import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.css']
})
export class AdderComponent implements OnInit {

  @Input() progress: number = 50;
  @Input() leyend: string = 'None';

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
