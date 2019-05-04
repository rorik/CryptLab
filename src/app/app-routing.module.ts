import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ciphers',
    loadChildren: './ciphers/ciphers.module#CiphersModule'
  },
  {
    path: 'docs',
    loadChildren: './docs/docs.module#DocsModule'
  },
  {
    path: '**',
    loadChildren: './docs/docs.module#DocsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
