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
 private interestLine;
 private principalLine;

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
    this.host.html(''); //just get rid of any existing charts
    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
//    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
//    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
//      let monthYear = Moment(values[0].innerText, 'MMMM YYYY').toJSON() ;

    let startYear = Moment(this.amortSchedule[0].month, 'MMMM YYYY').toDate();
    let endYear =  Moment(this.amortSchedule[this.amortSchedule.length-1].month, 'MMMM YYYY').toDate();
    this.xScale = D3.time.scale().range([20, 880]).domain([startYear,endYear]);
    this.yScale = D3.scale.linear().range([20, 580]).domain([(this.amortSchedule[0].interest+this.amortSchedule[0].principal),0]);

  }

  buildSVG() {

    this.xAxis = D3.svg.axis()
        .scale(this.xScale);
      
    this.yAxis = D3.svg.axis()
        .scale(this.yScale)
        .orient("left");

    this.svg = this.host.append("svg")
                  .attr("width", 900).attr("height", 600);

    this.svg.append("g")
       .attr("class","axis")
       .attr("transform", "translate(40," + (580) + ")")
       .call(this.xAxis);

    this.svg.append("g")
        .attr("class","axis")
        .attr("transform", "translate(" + (60) + ",0)")
        .call(this.yAxis);

    this.interestLine =  D3.svg.line<AmortItem>()  //NB using typescript had to specify the type passed into the function
                    .x(function(d) {                      
                      return this.xScale(Moment(d.month, 'MMMM YYYY').toDate());
                    })
                    .y(function(d) {
                      return this.yScale(d.interest);
                    });   

    this.svg.append('path')
      .attr('d', this.interestLine(this.amortSchedule))
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    this.principalLine =  D3.svg.line<AmortItem>()  //NB using typescript had to specify the type passed into the function
                    .x(function(d) {                      
                      return this.xScale(Moment(d.month, 'MMMM YYYY').toDate());
                    })
                    .y(function(d) {
                      return this.yScale(d.principal);
                    });   

    this.svg.append('path')
      .attr('d', this.principalLine(this.amortSchedule))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

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