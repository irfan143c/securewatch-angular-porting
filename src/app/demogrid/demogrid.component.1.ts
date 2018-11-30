import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { UserData } from '../models/UserData';
import { DataService } from '../services/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-demogrid',
  templateUrl: './demogrid.component.html',
  styleUrls: ['./demogrid.component.css']
})
export class DemogridComponent implements OnInit {

  displayedColumns = [];
  dataSource: MatTableDataSource<UserData>;

  @Input() tableData: any;
  @Input() action: boolean;

  @ViewChild('table') table: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterForm: FormGroup;

  colValue: any;
  clauseValue: any;
  filterVal: any;
  dateFilterVal: any;

  allValues: any;

  showFilter: boolean = true;
  showDateFilter: boolean = false;

  clauses: any;
  clausesString: any;

  numberClauses = ['=', '≠', '<', '>', '≤', '≥'];
  stringClauses = ['contains', 'notContain', 'isEqualTo', 'isNotEqualTo'];

  defDropdown: boolean = true;
  numDropdown: boolean;
  strDropdown: boolean;

  totalColumns = [];

  filteredValues = {
    id: '', name: '', progress: '', color: ''
  };

  clearFilteredValues = {
    id: '', name: '', progress: '', color: ''
  };

  filteredFormData = [];

  showHideColumn = new FormControl();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    let users = this.tableData;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

    this.displayedColumns = Object.keys(users[0]);

    if (this.action == true) {
      this.displayedColumns.push('action');
    }

    //Show-Hide dropdown array
    this.totalColumns = this.displayedColumns;
    this.showHideColumn.setValue(this.displayedColumns);


    //Filter Form Creation
    this.filterForm = this.fb.group({
      aliases: this.fb.array([this.createItem()])
    });

    //Set datasource filter
    this.filterForm.get('aliases').valueChanges.subscribe(
      data => {
        this.filteredFormData = data;
      });


    this.dataSource.filterPredicate = (data, filter) => {

      console.log(filter);

      let result;

      let searchString = JSON.parse(filter);

      this.aliases.value.forEach((flt) => {
        if (flt.columnVal == 'id') {
          if (flt.numClauseVal == "=") {
            result = data.id == searchString.id;
          }
          else if (flt.numClauseVal == "≠") {
            result = data.id != searchString.id;
          }
        }

        if (flt.columnVal == 'name') {
          if (flt.strClauseVal == "contains") {
            result = data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
          }
        }
      });

      return result;

      // console.log('Data : ', data);
      // console.log('Filter : ', filter);



      // return data.id.toString().trim().indexOf(searchString.id) !== -1 &&
      //   data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
      //   data.progress.toString().trim().indexOf(searchString.progress) !== -1 &&
      //   data.color.toString().trim().toLowerCase().indexOf(searchString.color.toLowerCase()) !== -1;
    }

  }


  applyFilter() {

    this.filteredFormData.forEach((val) => {
      this.filteredValues[val.columnVal] = val.filterVal;
    });

    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }


  customFilterPredicate() {
    let myFilterPredicate;
    // if(this.clauseValue == "contains") {
    myFilterPredicate = (data, filter): boolean => {
      let searchString = JSON.parse(filter);

      return data.id.toString().trim().indexOf(searchString.id) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.progress.toString().trim().indexOf(searchString.progress) !== -1 &&
        data.color.toString().trim().toLowerCase().indexOf(searchString.color.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }


  //Functions for creating filter fields dynamically.
  createItem() {
    return this.fb.group({
      columnVal: '',
      numClauseVal: '',
      strClauseVal: '',
      filterVal: ''
    });
  }

  get aliases() {
    return this.filterForm.get('aliases') as FormArray;
  }
  addFilter() {
    this.aliases.push(this.createItem());
    // console.log(this.aliases.controls[i]);
  }
  removeFilter(i: number) {
    this.aliases.removeAt(i);
  }

  showData(data) {
    alert('ID is : ' + data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  numberFilter() {
    if (this.clauseValue == '=') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] == filter;
      }
    }
    else if (this.clauseValue == '≠') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] != filter;
      }
    }
    else if (this.clauseValue == '<') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] < filter;
      }
    }
    else if (this.clauseValue == '>') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] > filter;
      }
    }
    else if (this.clauseValue == '≤') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] <= filter;
      }
    }
    else if (this.clauseValue == '≥') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] >= filter;
      }
    }
    // else if (this.clauseValue == '<>') {
    //   this.dataSource.filterPredicate = (data, filter) => {
    //     return data[this.colValue] < filter && data[this.colValue] > filter;
    //   }
    // }

  }

  stringFilter() {

    if (this.clauseValue == 'contains') {
      this.dataSource.filterPredicate = (data, filter) => {
        console.log(filter);

        let srchStr = JSON.parse(filter);

        let dataStr = data[this.colValue];
        return dataStr.indexOf(srchStr[this.colValue]) !== -1;
      }
    }
    else if (this.clauseValue == 'notContain') {
      this.dataSource.filterPredicate = (data, filter) => {
        let dataStr = data[this.colValue];
        return dataStr.indexOf(filter) === -1;
      }
    }
    else if (this.clauseValue == 'isEqualTo') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] == filter;
      }
    }
    else if (this.clauseValue == 'isNotEqualTo') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue] != filter;
      }
    }
  }

  dateFilter() {
    if (this.clauseValue == '=') {
      this.dataSource.filterPredicate = (data, filter) => {

        // console.log(data[this.colValue].getTime() == new Date(filter).getTime());

        return data[this.colValue].getTime() == new Date(filter).getTime();
      }
    }
    else if (this.clauseValue == '≠') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue].getTime() != new Date(filter).getTime();
      }
    }
    else if (this.clauseValue == '<') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue].getTime() < new Date(filter).getTime();
      }
    }
    else if (this.clauseValue == '>') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue].getTime() > new Date(filter).getTime();
      }
    }
    else if (this.clauseValue == '≤') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue].getTime() <= new Date(filter).getTime();
      }
    }
    else if (this.clauseValue == '≥') {
      this.dataSource.filterPredicate = (data, filter) => {
        return data[this.colValue].getTime() >= new Date(filter).getTime();
      }
    }
  }

  // clearFilter() {
  //   // this.filterForm.reset("");

  //   this.dataSource.filter = ""

  //   // this.dataSource.filter = JSON.stringify(this.clearFilteredValues);
  //   // for(let obj in this.filteredValues) {
  //   //   this.filteredValues[obj] = "";      
  //   // }
  //   // console.log(this.filteredValues);
  //   // this.applyFilter();
  // }


  //Function for show / hide columns
  isCheck() {
    this.displayedColumns = this.showHideColumn.value;
  }

  //Excel File Export
  exportCsv() {
    new Angular5Csv(this.tableData, 'ExcelReport', { headers: this.displayedColumns });
  }

  //PDF File Export
  exportPdf() {

    let doc: any = new jsPdf('p', 'pt');
    let rows = [];

    this.tableData.forEach(key => {
      let data = [key.id, key.name, key.progress, key.color, key.date];
      rows.push(data);
    });

    doc.autoTable(this.displayedColumns, rows);
    doc.save('pdfdata.pdf');
  }

}