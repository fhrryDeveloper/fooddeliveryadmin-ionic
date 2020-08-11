import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private util: UtilService
  ) {
    console.log(this.util.getReport());
  }

  ngOnInit() {
  }

}
