import { CiphersCommonModule } from './../common/ciphers-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolyalphabeticRoutingModule } from './polyalphabetic-routing.module';
import { VigenereComponent } from './vigenere/vigenere.component';
import { MatSliderModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [VigenereComponent],
  imports: [
    CommonModule,
    PolyalphabeticRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    CiphersCommonModule,
    TextFieldModule
  ]
})
export class PolyalphabeticModule {}