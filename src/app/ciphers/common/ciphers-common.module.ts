import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatButtonModule
} from '@angular/material';

/* Components */
import { AlphabetComponent } from './alphabet/alphabet.component';
import { CipherOperatorComponent } from './cipher-operator/cipher-operator.component';
import { EncryptExampleComponent } from './encrypt-example/encrypt-example.component';
import { MatrixComponent } from './matrix/matrix.component';

@NgModule({
  declarations: [AlphabetComponent, CipherOperatorComponent, EncryptExampleComponent, MatrixComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    AlphabetComponent,
    CipherOperatorComponent,
    EncryptExampleComponent,
    MatrixComponent
  ]
})
export class CiphersCommonModule { }
