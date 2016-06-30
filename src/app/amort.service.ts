import { Injectable } from '@angular/core';

@Injectable()
export class AmortService {

  constructor() {}

  getAmortSchedule() {
    return [
      { 'month': 'Jan 2011', 'interest': 11111, 'principal': 123123 },
      { 'month': 'Jan 2011', 'interest': 11111, 'principal': 123123 },
      { 'month': 'Jan 2011', 'interest': 11111, 'principal': 123123 },
      { 'month': 'Jan 2011', 'interest': 11111, 'principal': 123123 },
      { 'month': 'Jan 2011', 'interest': 11111, 'principal': 123123 }
    ]
  }
}
