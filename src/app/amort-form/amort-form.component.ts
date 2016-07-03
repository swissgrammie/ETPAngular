import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';

import { AmortItem } from '../amort-item';
import { AmortInputs } from './amort-inputs';
import { AmortScheduleComponent } from '../amort-schedule/amort-schedule.component';
import { AmortLineChartComponent } from '../amort-line-chart/amort-line-chart.component';
import { AmortService } from '../amort.service';

@Component({
  moduleId: module.id,
  selector: 'app-amort-form',
  templateUrl: 'amort-form.component.html',
  styleUrls: ['amort-form.component.css'],
  directives: [AmortScheduleComponent, AmortLineChartComponent],
  providers: [AmortService]
})

export class AmortFormComponent implements OnInit {
  
  amortSchedule: AmortItem[];

  constructor(private amortService: AmortService) {}


  submitted = false;
  onSubmit() { 
    this.amortService.getAmortSchedule().subscribe(amortSchedule => this.amortSchedule = amortSchedule);
    this.submitted = true; 
  }

  model = new AmortInputs(new Date(), new Date(), 200000,2000,5.5,30);

    ngOnInit() {
       
     // 
      
  }

}
