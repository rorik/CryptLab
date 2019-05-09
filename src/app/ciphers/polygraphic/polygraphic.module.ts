import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatTooltipModule } from '@angular/material';

import { CiphersCommonModule } from 'src/app/ciphers/common/ciphers-common.module';

import { PolygraphicRoutingModule } from './polygraphic-routing.module';
import { HillComponent } from './hill/hill.component';

@NgModule({
  declarations: [HillComponent],
  imports: [
    CommonModule,
    CiphersCommonModule,
    PolygraphicRoutingModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class PolygraphicModule { }
