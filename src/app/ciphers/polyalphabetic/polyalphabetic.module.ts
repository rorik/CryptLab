import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatIconModule, MatTooltipModule } from '@angular/material';

import { CiphersCommonModule } from 'src/app/ciphers/common/ciphers-common.module';

import { PolyalphabeticRoutingModule } from './polyalphabetic-routing.module';
import { VigenereComponent } from './vigenere/vigenere.component';
import { BeaufortComponent } from './beaufort/beaufort.component';
import { BeaufortVariantComponent } from './beaufort-variant/beaufort-variant.component';
import { GronsfeldComponent } from './gronsfeld/gronsfeld.component';
import { OneTimePadComponent } from './one-time-pad/one-time-pad.component';

@NgModule({
  declarations: [VigenereComponent, BeaufortComponent, BeaufortVariantComponent, GronsfeldComponent, OneTimePadComponent],
  imports: [
    CommonModule,
    PolyalphabeticRoutingModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    CiphersCommonModule
  ]
})
export class PolyalphabeticModule {}
