import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemogridComponent } from './demogrid/demogrid.component';
import { FormcontrolsComponent } from './formcontrols/formcontrols.component';
import { ShowgridComponent } from './showgrid/showgrid.component';

const routes: Routes = [
  { path: '', redirectTo : 'formcontrols', pathMatch : 'full' },
  { path : 'formcontrols', component : FormcontrolsComponent },
  { path : 'gridcontrol', component : ShowgridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
