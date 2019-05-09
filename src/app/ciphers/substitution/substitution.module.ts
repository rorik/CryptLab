import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatIconModule, MatTooltipModule } from '@angular/material'

import { CiphersCommonModule } from 'src/app/ciphers/common/ciphers-common.module';

import { SubstitutionRoutingModule } from './substitution-routing.module';
import { CaesarComponent } from './caesar/caesar.component';
import { DecimationComponent } from './decimation/decimation.component';
import { AffineComponent } from './affine/affine.component';

@NgModule({
  declarations: [CaesarComponent, DecimationComponent, AffineComponent],
  imports: [
    CommonModule,
    SubstitutionRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    CiphersCommonModule
  ]
})
export class SubstitutionModule {}
