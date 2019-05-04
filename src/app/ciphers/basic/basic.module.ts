import { CiphersCommonModule } from './../common/ciphers-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { CaesarComponent } from './caesar/caesar.component';
import { DecimationComponent } from './decimation/decimation.component';
import { AffineComponent } from './affine/affine.component';
import { VigenereComponent } from './vigenere/vigenere.component';
import { MatSliderModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [CaesarComponent, DecimationComponent, AffineComponent, VigenereComponent],
  imports: [
    CommonModule,
    BasicRoutingModule,
    MatSliderModule,
    CiphersCommonModule,
    TextFieldModule
  ]
})
export class BasicModule {}
