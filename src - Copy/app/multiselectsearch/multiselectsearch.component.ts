import { Component, OnInit, ViewChild, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { Testdata } from '../models/Testdata';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-multiselectsearch',
  templateUrl: './multiselectsearch.component.html',
  styleUrls: ['./multiselectsearch.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectsearchComponent),
      multi: true
    }
  ]
})

export class MultiselectsearchComponent implements OnInit, ControlValueAccessor {

  private _selectValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_:any) => {};

  @Input() dropdownOptions: any;
  @Input() placeholder : any;
  @Output() onCheck = new EventEmitter();
  arrayData: any;

  /** control for the MatSelect filter keyword multi-selection */
  public multiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword for multi-selection */
  public filteredMulti: ReplaySubject<Testdata[]> = new ReplaySubject<Testdata[]>(1);

  @ViewChild('multiSelect') multiSelect: MatSelect;

  ngOnInit() {
    this.arrayData = this.dropdownOptions;

    // load the initial bank list
    this.filteredMulti.next(this.arrayData.slice());

    this.multiFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  onChange() {
    this.onCheck.emit();    
  }

  private filterBanksMulti() {
    if (!this.arrayData) {
      return;
    }
    // get the search keyword
    let search = this.multiFilterCtrl.value;
    if (!search) {
      this.filteredMulti.next(this.arrayData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the arrayData
    this.filteredMulti.next(
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