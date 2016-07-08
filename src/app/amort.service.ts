import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AmortItem } from './amort-item';

@Injectable()
export class AmortService {

  constructor(private http: Http) {}

  private url = 'http://docker.local:8080/mort/servlet';
  
  //private url = 'http://192.168.99.100:8080/mort/servlet';

  private geturl = this.url + '?transid=init&DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30';
  private body = 'transid=outp&DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30';
  private inputbody = 'transid=inpt&DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30';
  private welcomebody = 'DFH_CURSOR=&DFH_ENTER=Enter';
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', withCredentials:true });


  getAmortSchedule() {    
    let resp: Response;

    var localheaders = new Headers();
    localheaders.append('Content-Type', 'application/x-www-form-urlencoded');

   
    return this.http.post(this.url, this.body , {headers: localheaders, withCredentials:true})
     .map((res: Response) => this.showData(res));

    // return this.http.get('/app/amortSchedule.json')
    //  .map((res: Response) => res.json()); 
  }

  getWelcomeScreen() {
    return this.http.get(this.url, {withCredentials:true})
     .map((res: Response) => null);    
  }

  getInputScreen() {
    var localheaders = new Headers();
    localheaders.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url, this.inputbody ,{headers: localheaders, withCredentials:true})
     .map((res: Response) => null);
  }

//wrote this routine to handle html response, could easily remove this if the service that we call returned json
  showData(res: Response) {
    let data = res.text();
    var parser = new DOMParser();
    var doc = parser.parseFromString(data,'text/html');
    
    let table: HTMLElement = doc.getElementById('datatable');    
    let rows = table.getElementsByTagName('tr');
    var amortSequence : AmortItem[] = new Array<AmortItem>();

//lets throw away the header row
    for (let i = 1; i<rows.length; i++) {
      let values = rows[i].getElementsByTagName('td');
      let monthYear = values[0].innerText;
      let principal = +values[1].innerText.replace(/[^0-9\.]+/g,"");  
      let interest = +values[2].innerText.replace(/[^0-9\.]+/g,"");
      amortSequence.push(new AmortItem(monthYear,principal,interest));       
    }
    
    return amortSequence; 
  }
}
