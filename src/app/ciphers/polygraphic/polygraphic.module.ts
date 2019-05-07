import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolygraphicRoutingModule } from './polygraphic-routing.module';
import { HillComponent } from './hill/hill.component';
import { CiphersCommonModule } from '../common/ciphers-common.module';

@NgModule({
  declarations: [HillComponent],
  imports: [
    CommonModule,
    CiphersCommonModule,
    PolygraphicRoutingModule
  ]
})
export class PolygraphicModule { }
