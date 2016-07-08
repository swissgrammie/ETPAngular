import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AmortService {

  constructor(private http: Http) {}

  
  private url = 'http://192.168.99.100:8080/mort/servlet';
  private geturl = 'http://192.168.99.100:8080/mort/servlet?transid=init&DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30';
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
    return this.http.get(this.geturl, {withCredentials:true})
     .map((res: Response) => res.json());    
  }

    getInputScreen() {
    var localheaders = new Headers();
    localheaders.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url, this.inputbody ,{headers: localheaders, withCredentials:true})
     .map((res: Response) => res.json());
  }

  showData(res: Response) {
    let data = res.text();
    var parser = new DOMParser();
    var doc = parser.parseFromString(data,'text/html');
    doc.firstChild; //this is what you're after.
    console.log(doc.firstChild);
    return res.json(); 
  }
}
