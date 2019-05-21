
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';

import { CiphersCommonModule } from 'src/app/ciphers/common/ciphers-common.module';
import { DocsRoutingModule } from './docs-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    CiphersCommonModule
  ]
})
export class DocsModule { }
