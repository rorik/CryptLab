import { CiphersCommonModule } from './../common/ciphers-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubstitutionRoutingModule } from './substitution-routing.module';
import { CaesarComponent } from './caesar/caesar.component';
import { DecimationComponent } from './decimation/decimation.component';
import { AffineComponent } from './affine/affine.component';
import { MatSliderModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [CaesarComponent, DecimationComponent, AffineComponent],
  imports: [
    CommonModule,
    SubstitutionRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    CiphersCommonModule,
    TextFieldModule
  ]
})
export class SubstitutionModule {}
