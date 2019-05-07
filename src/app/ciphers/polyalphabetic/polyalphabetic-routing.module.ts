import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VigenereComponent } from './vigenere/vigenere.component';
import { BeaufortComponent } from './beaufort/beaufort.component';
import { BeaufortVariantComponent } from './beaufort-variant/beaufort-variant.component';
import { GronsfeldComponent } from './gronsfeld/gronsfeld.component';
import { OneTimePadComponent } from './one-time-pad/one-time-pad.component';

const routes: Routes = [
  {
    path: 'vigenere',
    component: VigenereComponent
  },
  {
    path: 'beaufort',
    component: BeaufortComponent
  },
  {
    path: 'beaufort-variant',
    component: BeaufortVariantComponent
  },
  {
    path: 'gronsfeld',
    component: GronsfeldComponent
  },
  {
    path: 'one-time-pad',
    component: OneTimePadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolyalphabeticRoutingModule { }
