import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';

import { DocsRoutingModule } from './docs-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class DocsModule { }
