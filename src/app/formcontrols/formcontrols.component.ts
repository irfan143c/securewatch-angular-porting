import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-formcontrols',
  templateUrl: './formcontrols.component.html',
  styleUrls: ['./formcontrols.component.css']
})
export class FormcontrolsComponent implements OnInit {

  data:any;
  reactiveForm: FormGroup;

  multiSelectTooltip : any;
  multiSelectSearchTooltip : any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    // console.log(this.tooltipdata);
    
    
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      selectSearch: '',
      multiSelect: '',
      multiSelectSearch: '',
      onlyNumber: '',
      dateRangePicker: '',
      names : '',
      nameswithlogin : ''
    });
  }

  onSubmit() {
    // console.log(this.reactiveForm.value);

    console.log(this.reactiveForm.controls['multiSelect'].value);
  }


  //Search Dropdown
  dropdownArray = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' }
  ];


  //Multiselect
  selectArray = ['Extra cheese','Mushroom','Onion','Pepperoni','Sausage','Tomato'];

  multiTooltip() {
    this.multiSelectTooltip = this.reactiveForm.controls['multiSelect'].value.join(', ');
  }


  //Multiselect Search
  multiSelectSearchArray = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' }
  ];

  multiSearchTooltip() {
    let multiSearchData = this.reactiveForm.controls['multiSelectSearch'].value;

    this.multiSelectSearchTooltip = multiSearchData.map(a => a.name);

  }


  // FisrtName LastName Array
  fisrtLastArray = [
    { firstName : 'John', lastName : 'Snow' },
    { firstName : 'David', lastName : 'Warner' },
    { firstName : 'Alex', lastName : 'Parker' },
    { firstName : 'Max', lastName : 'Ten' },
    { firstName : 'Barry', lastName : 'Alan' },
  ];


  // FisrtName LastName with Login ID Array
  fisrtLastLoginArray = [
    { loginId : '1', firstName : 'John', lastName : 'Snow' },
    { loginId : '2', firstName : 'David', lastName : 'Warner' },
    { loginId : '3', firstName : 'Alex', lastName : 'Parker' },
    { loginId : '4', firstName : 'Max', lastName : 'Ten' },
    { loginId : '5', firstName : 'Barry', lastName : 'Alan' },

  ];


  // tableData = this.dataSrvc.dataArray;

}