import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserData } from '../models/UserData';

@Component({
  selector: 'app-showgrid',
  templateUrl: './showgrid.component.html',
  styleUrls: ['./showgrid.component.css']
})
export class ShowgridComponent implements OnInit {

  dataGrid : any;

  constructor( private dataSrvc : DataService) {
    // console.log(dataSrvc.dataArray);
  }

  ngOnInit() {
    this.dataGrid = this.dataSrvc.dataArray;
  }

}
