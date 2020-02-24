import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graphic-doughnut',
  templateUrl: './graphic-doughnut.component.html',
  styles: []
})
export class GraphicDoughnutComponent implements OnInit {

  @Input() label: Label[];
  @Input() data: MultiDataSet;
  public chart: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
