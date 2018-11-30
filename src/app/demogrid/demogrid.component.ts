import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { UserData } from '../models/UserData';
import { DataService } from '../services/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { filter } from 'rxjs/operator/filter';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-demogrid',
  templateUrl: './demogrid.component.html',
  styleUrls: ['./demogrid.component.css'],
  providers: [NgbDropdownConfig]
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

  numberClauses = [
    // { value: "contain", label: "contain" },
    { value: "is-equal", label: "=" },
    { value: "is-not-equal", label: "≠" },
    { value: "is-less-than", label: "<" },
    { value: "is-greater-than", label: ">" }
  ];

  stringClauses = [
    { value: "contain", label: "Contain" },
    { value: "notContain", label: "Not Contain" },
    { value: "is-equal", label: "Is Equal To" },
    { value: "is-not-equal", label: "Is Not Equal To" }
  ];

  CONDITIONS_FUNCTIONS = {
    // search method base on conditions list value
    "contain": function (value, filterdValue) {
      return value.indexOf(filterdValue) !== -1;
    },
    "notContain": function (value, filterdValue) {
      return value.indexOf(filterdValue) === -1;
    },
    "is-equal": function (value, filterdValue) {
      return value == filterdValue;
    },
    "is-not-equal": function (value, filterdValue) {
      return value != filterdValue;
    },

    "is-greater-than": function (value, filterdValue) {
      return value > filterdValue;
    },
    "is-less-than": function (value, filterdValue) {
      return value < filterdValue;
    }
  };

  defDropdown: boolean = true;
  numDropdown: boolean;
  strDropdown: boolean;

  totalColumns = [];

  //variables for and-or dropdown
  clauseDropdown = new FormControl();
  options = ['and', 'or'];

  filteredValues = {
    id: '', name: '', progress: '', color: ''
  };

  filteredFormData = [];

  public searchCondition: any = { };

  showHideColumn = new FormControl();


  searchFilter: any = {
    values: this.filteredValues,
    conditions: this.searchCondition,
    methods: this.CONDITIONS_FUNCTIONS
  }

  constructor(private fb: FormBuilder, config: NgbDropdownConfig) {
    this.clauseDropdown.setValue('and', {onlySelf: true})

    config.placement = 'bottom-left';
    config.autoClose = false;
  }

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
      var ormatcher=[];
    this.dataSource.filterPredicate = (p: any, filter: any) => {
      debugger;
      const matchFilter = [];
      // console.log(filter);
      let result = true;
      let keys = Object.keys(p); // keys of the object data
      // console.log(keys);
      // if(ormatcher!=null){
      //   for(let i = 0; i < ormatcher.length ; i++){
      //       matchFilter.push(ormatcher[i]);
      //   }
      // }
      for (const key of keys) {
        let searchCondition = filter.conditions[key]; // get search filter method
        // console.log(searchCondition);

        if (searchCondition && searchCondition !== 'none' ) {
          if (filter.methods[searchCondition](p[key], filter.values[key]) === false) {
            // invoke search filter 
            result = false // if one of the filters method not succeed the row will be remove from the filter result
            matchFilter.push(result);
            break;
          }else{
            result =true;
            matchFilter.push(result);
            ormatcher.push(matchFilter);
          }
        }
      }
      
      if(this.clauseDropdown.value=='or'){
        console.log(ormatcher)
        return matchFilter.some(Boolean);
      }else{
        return matchFilter.every(Boolean);
      }

      
      
    };

    // this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
    //   const matchFilter = [];
    //   const filters = JSON.parse(filtersJson);
    //   debugger;
    //   filters.forEach(filter => {
    //     // check for null values!
    //     console.log(filter);
    //     console.log(filter.id);
    //     console.log(filter.value);
    //     const val = data[filter.id] === null ? '' : data[filter.id];
    //     console.log(val);
    //     matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
    //   });

    //    // Choose one
    //     return matchFilter.every(Boolean); // AND condition
    //     // return matchFilter.some(Boolean); // OR condition
    // }

  }
searchData:any=[];

applyFilter(checkVal){
  this.filteredFormData.forEach((val) => {
    this.clauseValue = val.numClauseVal;
    this.filteredValues[val.columnVal] = val.filterVal;
  });
  console.log(this.clauseDropdown.value);
  // console.log(this.aliases.length);

  this.searchFilter = {
    values: this.filteredValues,
    conditions: this.searchCondition,
    methods: this.CONDITIONS_FUNCTIONS
  }

  let cndKeys = Object.keys(this.searchFilter.conditions);

  if(checkVal != 'no') {
    if(this.aliases.length == 1) {
      if(Object.keys(this.searchFilter.conditions).length > 1) {
        delete this.searchFilter.conditions[cndKeys[0]];
      }
    }
  }

  // console.log(this.searchFilter);
  this.dataSource.filter = this.searchFilter;

  console.log(this.dataSource);
}

//   applyFilter(checkVal) {
//     debugger;
//     const tableFilters = [];
    
//     console.log(this.filteredFormData);
//     if(this.clauseDropdown.value=='or'){

//       for(let i = 0; i < this.filteredFormData.length ; i++){
//         var index = i;
//         var condition:any = {};
//         var keys = Object.keys(this.searchCondition);
//         var len = keys.length;
//         var keysF = {};
//         var obj = {};
//         for (let key in this.searchCondition) {
//           // conditions: [this.searchCondition.key='id:'+this.searchCondition.value,this.searchCondition.key='name:'+this.searchCondition.value]
//           if(key == this.filteredFormData[i+1].columnVal){
//             var stringobj= key+':'+this.searchCondition[key];
//             var properties = stringobj.split(', ');
           
//             properties.forEach(function(property) {
//             var tup = property.split(':');
//             obj[tup[0]] = tup[1];
// });
//           }
          
//         }
//         keysF=obj;
//         // console.log(keysF);

//         // condition = this.filteredFormData[i+1].columnVal+':'+this.searchCondition[this.filteredFormData[i+1].columnVal];
//         console.log(keysF);
//         this.clauseValue = this.filteredFormData[i].numClauseVal;
//         this.filteredValues = {
//           id: '', name: '', progress: '', color: ''
//         };
        
//         this.filteredValues[ this.filteredFormData[i+1].columnVal] =  this.filteredFormData[i+1].filterVal;
        
//         this.searchFilter = {
//           values: this.filteredValues,
//           conditions: keysF,
//           methods: this.CONDITIONS_FUNCTIONS
//         }

//         this.dataSource.filter = this.searchFilter;
//         console.log(this.dataSource);
//         if(this.dataSource.filteredData.length>0){  
//           if(this.searchData!=null && this.searchData.length>0){
//           for(let data of this.dataSource.filteredData){
//               for(let ser of this.searchData){
//                 var found:boolean;
//                 if(data.id == ser.id){
//                   found=true;
//                 }
//               }
//               if(!found){
//                 this.searchData.push(data);
//               }
//           }
//         }else{
//           for(let data of this.dataSource.filteredData){
//                 this.searchData.push(data);
//         }
//         }
          
//         }
//         console.log(this.searchData);
//         this.dataSource = new MatTableDataSource(this.searchData);
//       }

//       // this.filteredFormData.forEach((val) => {
//       //   this.clauseValue = val.numClauseVal;
//       //   this.filteredValues[val.columnVal] = val.filterVal;
        
//       //   this.searchFilter = {
//       //     values: this.filteredValues,
//       //     conditions: this.searchCondition,
//       //     methods: this.CONDITIONS_FUNCTIONS
//       //   }

//       //   this.dataSource.filter = this.searchFilter;

//       //   if(this.dataSource.filteredData.length==0){

//       //   }

//       // });

//     }else{
//       this.filteredFormData.forEach((val) => {
//         this.clauseValue = val.numClauseVal;
//         this.filteredValues[val.columnVal] = val.filterVal;
//       });
//       console.log(this.clauseDropdown.value);
//       // console.log(this.aliases.length);
  
//       this.searchFilter = {
//         values: this.filteredValues,
//         conditions: this.searchCondition,
//         methods: this.CONDITIONS_FUNCTIONS
//       }
  
//       let cndKeys = Object.keys(this.searchFilter.conditions);
  
//       if(checkVal != 'no') {
//         if(this.aliases.length == 1) {
//           if(Object.keys(this.searchFilter.conditions).length > 1) {
//             delete this.searchFilter.conditions[cndKeys[0]];
//           }
//         }
//       }
  
//       // console.log(this.searchFilter);
//       this.dataSource.filter = this.searchFilter;
  
//       console.log(this.dataSource);
//     }
   

//   }


  customFilterPredicate() {

    debugger;
    let myFilterPredicate;
    // if(this.clauseValue == "contains") {
    myFilterPredicate = (data, filter): boolean => {
      let searchString = JSON.parse(filter);
      console.log(data);
      console.log(searchString);
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

    let cndKeys = Object.keys(this.searchFilter.conditions);
    // console.log(cndKeys);

    // this.applyFilter(i);
    // console.log(cndKeys[i]);

    delete this.searchFilter.conditions[cndKeys[i]];

    this.applyFilter('no');

  }

  showData(data) {
    alert('ID is : ' + data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  numberFilter() {
    // debugger;
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