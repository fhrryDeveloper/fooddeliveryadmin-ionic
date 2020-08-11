import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  report: any;
  constructor(

  ) { }


  setReport(data) {
    this.report = data;
  }

  getReport() {
    return this.report;
  }

  getCurrencyCode() {
    return environment.general.code;
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }
}
