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
    this.host = D3.select(this.element.nativeElement);
 }

 /**
 * Everythime the @Input is updated, we rebuild the chart
 **/
  ngOnChanges(): void {
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  setup() {
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
    this.xScale = D3.time.scale().range([0, this.width]);
    this.yScale = D3.scale.linear().range([this.height, 0]);    
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  populate() {

  }

  drawXAxis() {

  }

  drawYAxis() {

  }

}