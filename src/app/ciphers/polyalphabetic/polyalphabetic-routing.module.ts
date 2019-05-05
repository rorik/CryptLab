import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VigenereComponent } from './vigenere/vigenere.component';

const routes: Routes = [
  {
    path: 'vigenere',
    component: VigenereComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolyalphabeticRoutingModule { }
