import { Component, Input , ElementRef} from '@angular/core';
import { AmortItem } from '../amort-item';
import * as d3 from 'd3';
import * as Moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-amort-line-chart',
  templateUrl: 'amort-line-chart.component.html',
  styleUrls: ['amort-line-chart.component.css']
})
export class AmortLineChartComponent {
  @Input() amortSchedule: AmortItem[];

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

 /**
 * We request angular for the element reference 
 * and then we create a D3 Wrapper for our host element
 **/
 constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
 }

 /**
 * Everythime the @Input is updated, we rebuild the chart
 **/
  ngOnChanges(): void {
  }
}