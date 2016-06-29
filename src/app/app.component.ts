import { Component } from '@angular/core';
import {AmortItem} from "./amort-item";
import { AmortFormComponent } from './amort-form/amort-form.component';

@Component({
  moduleId: module.id,
  selector: 'myapp',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [AmortFormComponent]
})
export class AppComponent {
  title = 'hello from graham!';

  amortSchedule = [
    new AmortItem("jan", 1, 2),
    new AmortItem("feb", 1, 2),
    new AmortItem("mar", 1, 2)
  ];
}
