import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HillComponent } from './hill/hill.component';

const routes: Routes = [
  {
    path: 'hill',
    component: HillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolygraphicRoutingModule { }
