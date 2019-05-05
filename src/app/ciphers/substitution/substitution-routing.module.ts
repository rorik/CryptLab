import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaesarComponent } from './caesar/caesar.component';
import { DecimationComponent } from './decimation/decimation.component';
import { AffineComponent } from './affine/affine.component';

const routes: Routes = [
  {
    path: 'caesar',
    component: CaesarComponent
  },
  {
    path: 'decimation',
    component: DecimationComponent
  },
  {
    path: 'affine',
    component: AffineComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubstitutionRoutingModule { }
