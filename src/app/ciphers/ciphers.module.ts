import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiphersRoutingModule } from './ciphers-routing.module';
import { MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CiphersRoutingModule,
    MatGridListModule
  ]
})
export class CiphersModule { }
