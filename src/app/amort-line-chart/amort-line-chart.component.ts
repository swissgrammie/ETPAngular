import { Component, Input , ElementRef} from '@angular/core';
import { AmortItem } from '../amort-item';
import * as D3 from 'd3';
import * as Moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-amort-line-chart',
  templateUrl: 'amort-line-chart.component.html',
  styleUrls: ['amort-line-chart.component.css']
})
export class AmortLineChartComponent {
  @Input() amortSchedule: AmortItem[];

  constructor(private element: ElementRef)  {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.element.nativeElement);
  }

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private htmlElement: HTMLElement;
  
}
