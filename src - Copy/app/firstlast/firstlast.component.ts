import { Component, OnInit, ViewChild, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Names } from '../models/names';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-firstlast',
  templateUrl: './firstlast.component.html',
  styleUrls: ['./firstlast.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FirstlastComponent),
      multi: true
    }
  ]
})

export class FirstlastComponent implements OnInit {

  private _selectValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_:any) => {};
  @Input() dropdownOptions: any;
  arrayData : any;

  /** control for the MatSelect filter keyword */
  public dropdownFilter: FormControl = new FormControl();

  /** list of arrayData filtered by search keyword */
  public filteredOptions: ReplaySubject<Names[]> = new ReplaySubject<Names[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  ngOnInit() {

    this.dropdownOptions.sort((a, b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0) );

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
      this.arrayData.filter(data => data.firstName.toLowerCase().indexOf(search) > -1 || data.lastName.toLowerCase().indexOf(search) > -1)
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