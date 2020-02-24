import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.css']
})
export class AdderComponent implements OnInit {

  @ViewChild('inputAdder') inputAdder: ElementRef;
  @Input() progress: number = 50;
  @Input() leyend: string = 'None';

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  add(value: number){
    if(!value || value <= 0){
      this.progress = 0;
      this.changeValue.emit(this.progress);
      return;
    }

    if(this.progress >= 100){
      this.progress = 100;
      this.changeValue.emit(this.progress);
      return;
    }

    this.progress += value;

    this.changeValue.emit(this.progress);
  }

  minus(value: number){
    if(!value || value >= 100){
      this.progress = 0;
      this.changeValue.emit(this.progress);
      return;
    }

    this.progress += value;
    this.changeValue.emit(this.progress);
  }

  onChange(event: number){
    //logica <= 0 100
    this.inputAdder.nativeElement.value = this.progress;
    this.changeValue.emit(this.progress);
  }
}
