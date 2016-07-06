import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AmortService {

  constructor(private http: Http) {}

  


  getAmortSchedule() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30';
    let welcomebody = 'DFH_CURSOR=&DFH_ENTER=Enter';
    let url = 'http://192.168.99.100:8080/mort/servlet';

    let resp: Response;

    this.http.get(url).map(this.showData);
    this.http.post(url, welcomebody,headers).map(this.showData);

    return this.http.post(url, body ,headers)
     .map(this.showData); 

    // return this.http.get('/app/amortSchedule.json')
    //  .map((res: Response) => res.json()); 
  }
  showData(res: Response) {
    let data = res.text();
  }
}
