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
    if (!this.amortSchedule )
      return;
    this.setup();
    this.buildSVG();
    // this.populate();
    // this.drawXAxis();
    // this.drawYAxis();
  }

  setup() {
    
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
//    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
//    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;

    this.xScale = D3.scale.linear().range([this.margin.left, 400 - this.margin.right]).domain([2000,2010]);
    this.yScale = D3.scale.linear().range([400 - this.margin.top, this.margin.bottom]).domain([134,215]);

  }

  buildSVG() {
    this.xAxis = D3.svg.axis()
        .scale(this.xScale);
      
    this.yAxis = D3.svg.axis()
        .scale(this.yScale);

    this.host.append("svg:g")
        .call(this.xAxis);

  }

populate() {  
    let totalPaymentPerMonth = this.amortSchedule[0].interest + this.amortSchedule[0].principal; 
    this.yScale.domain([0, totalPaymentPerMonth]);
    this.xScale.domain([0, this.amortSchedule.length])
    this.svg.append('path')
      .datum(this.amortSchedule)
      .attr('class', 'area')
      .style('fill', 'rgba(195, 0, 47, 1)')
      .attr('d',D3.svg.area()
        .x( (d: any) => this.xScale(d.indexOf(d))      ) //fix does not work maybe i should just do a map on the incoming data to get what i want.
        .y0(this.htmlElement.clientHeight)
        .interpolate('monotone'));
      
  }

  drawXAxis() : void {
    this.xAxis = D3.svg.axis().scale(this.xScale);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.htmlElement.clientHeight + ')')
      .call(this.xAxis);
    
  }

  drawYAxis() {
    this.yAxis = D3.svg.axis().scale(this.yScale)
      .orient('left')
      .tickPadding(10);
      this.svg.append('g')
        .attr('class', 'y axis')
        .call(this.yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)');      
  }

}