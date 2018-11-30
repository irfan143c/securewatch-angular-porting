import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  users : any;
  filterSection : boolean;
  dropdownArray : any;

  @Input() usersData : any;
  @Input() action : boolean;

  // displayedColumns = ['id', 'name', 'progress', 'color'];

  filters = ['contains', 'notContain'];

  displayedColumns = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns = new FormControl();
  clauses = new FormControl();

  constructor( private dataSrvc : DataService ) {
    // console.log(dataSrvc.dataArray);
    
    this.dropdownArray = Object.keys(dataSrvc.dataArray[0]);

  }

  ngOnInit() {
    this.users = this.usersData;

    let columnsKeys = Object.keys(this.users[0]);

    this.displayedColumns = columnsKeys;

    if(this.action == true) {
      this.displayedColumns.push('action');
    }

    // console.log(this.displayedColumns);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);

    if(!isNullOrUndefined(this.columns.value)) {

      console.log(this.columns.value);
      
      this.dataSource.filterPredicate = (data, filter) => {
      let colName = data.name //+ data.color;

        const dataStr = colName;
        return dataStr.indexOf(filter) !== -1;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

    // console.log(this.columns.value);
    // console.log(this.clauses.value);
    

  }

  showData(data) {
    alert('ID is : '+ data);
  }


  showFilter() {
    this.filterSection = !this.filterSection;
  }

}
