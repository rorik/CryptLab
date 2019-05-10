import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';

import { DocsRoutingModule } from './docs-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class DocsModule { }
