import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';

import { CiphersRoutingModule } from './ciphers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CiphersRoutingModule,
    MatGridListModule
  ]
})
export class CiphersModule { }
