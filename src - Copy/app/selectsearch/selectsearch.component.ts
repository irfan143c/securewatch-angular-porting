import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Testdata } from '../models/Testdata';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-selectsearch',
  templateUrl: './selectsearch.component.html',
  styleUrls: ['./selectsearch.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectsearchComponent),
      multi: true
    }
  ]
})

export class SelectsearchComponent implements OnInit, ControlValueAccessor {

  private _selectValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_:any) => {};
  @Input() dropdownOptions: any;
  arrayData : any;

  /** control for the MatSelect filter keyword */
  public dropdownFilter: FormControl = new FormControl();

  /** list of arrayData filtered by search keyword */
  public filteredOptions: ReplaySubject<Testdata[]> = new ReplaySubject<Testdata[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  ngOnInit() {

    this.arrayData = this.dropdownOptions;

    // load the initial array data list
    this.filteredOptions.next(this.arrayData.slice());

    // listen for search field value changes
    this.dropdownFilter.valueChanges
      .subscribe(() => {
        this.filterData();
      });
  }

  private filterData() {
    if (!this.arrayData) {
      return;
    }
    // get the search keyword
    let search = this.dropdownFilter.value;
    if (!search) {
      this.filteredOptions.next(this.arrayData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the arrayData
    this.filteredOptions.next(
      this.arrayData.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


  get selectValue(): any {
    return this._selectValue;
  }
  set selectValue(value: any) {
    if (value !== this._selectValue) {
      this._selectValue = value;
      this._onChangeCallback(value);
    }

     this._onTouchedCallback();
  }


  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._selectValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

}