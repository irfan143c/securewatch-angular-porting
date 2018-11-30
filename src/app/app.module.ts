import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatMenuModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SelectsearchComponent } from './selectsearch/selectsearch.component';
import { GridComponent } from './grid/grid.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MultiselectsearchComponent } from './multiselectsearch/multiselectsearch.component';
import { OnlynumbersDirective } from './directives/onlynumbers.directive';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DataService } from './services/data.service';
import { DemogridComponent } from './demogrid/demogrid.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { FirstlastComponent } from './firstlast/firstlast.component';
import { FirstlastloginidComponent } from './firstlastloginid/firstlastloginid.component';
import { FormcontrolsComponent } from './formcontrols/formcontrols.component';
import { ShowgridComponent } from './showgrid/showgrid.component';


@NgModule({
  declarations: [
    AppComponent,
    SelectsearchComponent,
    GridComponent,
    MultiselectComponent,
    MultiselectsearchComponent,
    OnlynumbersDirective,
    DaterangepickerComponent,
    DemogridComponent,
    SearchfilterPipe,
    FirstlastComponent,
    FirstlastloginidComponent,
    FormcontrolsComponent,
    ShowgridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDaterangepickerMd,
    MatMenuModule,
    MatTooltipModule,
    NgbModule.forRoot(),
    DragulaModule.forRoot()
  ],
  providers: [
    DataService
  ],
  exports: [
    SearchfilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
