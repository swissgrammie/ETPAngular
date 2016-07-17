import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AmortItem } from './amort-item';
import { AmortInputs } from './amort-form/amort-inputs';

@Injectable()
export class AmortService {

  constructor(private http: Http) {}



  private inputbody = 'transid=inpt&DFH_CURSOR=MONTH&MONTH=1&YEAR=2011&PRICE=100000&DPAY=0&INTREST=5.5&YEARS=30'; //just for testing


  //private url = 'http://docker.local:8080/mort/servlet';  
  private url = 'http://192.168.99.100:8080/mort/servlet';
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', withCredentials:true });

  
  getAmortSchedule(params :AmortInputs ) {    
    let resp: Response;

    
    let urlParams = new URLSearchParams();
    //now lets map our input model params to the ones the service needs
    let startDate: Date = new Date(Date.parse(params.startYear.toString())); //bit of a hack cause i am getting a string from the html5 input field (browser dependent?)

    urlParams.set("MONTH", startDate.getMonth().toString()); //TODO off by one error?
    urlParams.set("YEAR", startDate.getFullYear().toString());
    urlParams.set("PRICE", params.loanAmount.toString());
    urlParams.set("DPAY", params.depositAmount.toString());
    urlParams.set("INTREST", params.interestRate.toString());
    urlParams.set("YEARS", params.loanDuration.toString());



    let localheaders = new Headers();
    localheaders.append('Content-Type', 'application/x-www-form-urlencoded');
   
 
    return this.http.post(this.url, urlParams.toString() , {headers: localheaders, withCredentials:true})
     .map((res: Response) => this.showData(res));

    //  return this.http.get('/app/amortSchedule.json')
    //   .map((res: Response) => res.json()); 
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

//lets throw away the header row by starting at 1
    for (let i = 1; i<rows.length; i++) {
      let values = rows[i].getElementsByTagName('td');
      let monthYear = values[0].innerText;
      let interest = +values[1].innerText.replace(/[^0-9\.]+/g,""); //know this probably fails with ,'s etc  but good enough regex for the demo
      let principal = +values[2].innerText.replace(/[^0-9\.]+/g,"");  
      amortSequence.push(new AmortItem(monthYear,interest,principal));       
    }
    
    return amortSequence; 
  }
}
