import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { UserData } from '../models/UserData';
import { DataService } from '../services/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';
import { DragulaService } from 'ng2-dragula';

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
  numberClauses = ['=', '≠', '<', '>', '≤', '≥'];
  stringClauses = ['contains', 'notContain', 'isEqualTo', 'isNotEqualTo'];

  totalColumns = [];

  filteredValues = {
    id: '', name: '', progress: '', color: ''
  };

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


    //FormCreation
    this.filterForm = this.fb.group({
      aliases: this.fb.array([this.createItem()])
    });

    // this.filterForm.controls['aliases'].valueChanges.subscribe(aliase => {
    //   this.clauseFilter(aliase);
    // })


    // let totalValues = this.filterForm.controls['aliases'].value;

    // this.filterForm.get('aliases').valueChanges.subscribe(
    //   data => {
    //     console.log(JSON.stringify(data));

    //     this.applyFilter(data);

    //   }
    // )

  }

  flt(data) {
    this.filterVal = data;
  }

  col(data) {
    this.colValue = data.value;
  }

  cls(data) {
    this.clauseValue = data.value;
  }

  //Function for creating filter fields dynamically.
  createItem() {
    return this.fb.group({
      columnVal: '',
      clauseVal: '',
      filterVal: '',
      dateVal: ''
    });
  }

  get aliases() {
    return this.filterForm.get('aliases') as FormArray;
  }
  addFilter() {
    this.aliases.push(this.createItem());
  }
  removeFilter(i: number) {
    this.aliases.removeAt(i);
  }


  showData(data) {
    alert('ID is : ' + data);
  }

  // createForm() {
  //   this.filterForm = this.fb.group({
  //     columns: '',
  //     clauses: '',
  //     filterValue: '',
  //     dateValue: '',
  //     less : '',
  //     more : ''
  //   });


  //   // this.columnForm = this.fb.group({
  //   //   showHideColumn : [this.displayedColumns]
  //   // })
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // clauseFilter() {
  //   const totalValues = this.filterForm.controls['aliases'].value;

  //   for (let i in totalValues) {
  //     this.colValue = totalValues[i].columnVal;
  //   }

  //     //code to change clauses and clear fields on change of columns input
  //     if (this.colValue == 'id' || this.colValue == 'progress' || this.colValue == 'date') {
  //       this.clauses = this.numberClauses;
  //       // this.filterForm.controls['filterValue'].setValue('');

  //     }
  //     else {
  //       this.clauses = this.stringClauses;
  //       // this.filterForm.controls['filterValue'].setValue('');
  //     }


  //   // console.log(this.allValues);



  // }

  applyFilter() {

    // this.filterForm.

    // for (let i in dataArray) {
    // this.colValue = this.col;
    // this.clauseValue = this.cls;
    // this.filterVal = this.flt;
    // this.dateFilterVal = dataArray[i].dateVal;

    // console.log(this.colValue + " " + this.clauseValue + " " + this.filterVal );

    if (!isNullOrUndefined(this.colValue) && !isNullOrUndefined(this.clauseValue) && this.colValue != '' && this.clauseValue != '') {

      //   if (this.colValue == 'id' || this.colValue == 'progress') {
      //     this.numberFilter()
      //   }
      //   else if (this.colValue == 'date') {
      //     this.dateFilter();
      //   }
      //   else {
      this.stringFilter();
      //   }
      // }
      console.log(this.colValue);

      this.filteredValues[this.colValue] = this.filterVal;

      this.dataSource.filter = JSON.stringify(this.filteredValues);

    }


    // else {

    //   //Code for global filter
    //   this.dataSource.filterPredicate = (data, filter) => {
    //     let dataStr = data.name + data.progress + data.color + data.id + data.date;
    //     return dataStr.indexOf(filter) !== -1;
    //   }
    // }

    // filterValue = filterValue.trim(); // Remove whitespace
    // // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;

    // if(this.colValue == 'date') {
    //   this.dataSource.filter = this.dateFilterVal;
    // }
    // else {
    //   this.dataSource.filter = this.filterVal;
    // }

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

  clearFilter() {
    this.filterForm.reset();
    // for(let obj in this.filteredValues) {
    //   this.filteredValues[obj] = "";      
    // }
    // console.log(this.filteredValues);
    // this.applyFilter();
  }


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