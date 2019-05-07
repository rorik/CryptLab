import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'substitution',
    loadChildren: './substitution/substitution.module#SubstitutionModule'
  },
  {
    path: 'polyalphabetic',
    loadChildren: './polyalphabetic/polyalphabetic.module#PolyalphabeticModule'
  },
  {
    path: 'polygraphic',
    loadChildren: './polygraphic/polygraphic.module#PolygraphicModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiphersRoutingModule { }
