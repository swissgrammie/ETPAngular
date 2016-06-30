import { Component, Input } from '@angular/core';
import { AmortItem } from '../amort-item';

@Component({
  moduleId: module.id,
  selector: 'app-amort-schedule',
  templateUrl: 'amort-schedule.component.html',
  styleUrls: ['amort-schedule.component.css']
})
export class AmortScheduleComponent {
  @Input() amortSchedule: AmortItem[];
}
