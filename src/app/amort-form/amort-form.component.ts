import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';

import { AmortItem } from '../amort-item';

@Component({
  moduleId: module.id,
  selector: 'app-amort-form',
  templateUrl: 'amort-form.component.html',
  styleUrls: ['amort-form.component.css']
})
export class AmortFormComponent implements OnInit {

  constructor() {}


  submitted = false;
  onSubmit() { this.submitted = true; }

  model = new AmortItem("JAN",1,1);

    ngOnInit() {
  }

}
