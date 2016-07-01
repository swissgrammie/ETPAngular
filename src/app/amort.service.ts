import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AmortService {

  constructor(private http: Http) {}

  getAmortSchedule() {
    return this.http.get('/app/amortSchedule.json')
     .map((res: Response) => res.json()); 
  }
}
