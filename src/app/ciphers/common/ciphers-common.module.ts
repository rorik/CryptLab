import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatButtonModule
} from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';

/* Components */
import { AlphabetComponent } from './alphabet/alphabet.component';
import { CipherOperatorComponent } from './cipher-operator/cipher-operator.component';
import { EncryptExampleComponent } from './encrypt-example/encrypt-example.component';
import { MatrixComponent } from './matrix/matrix.component';

@NgModule({
  declarations: [AlphabetComponent, CipherOperatorComponent, EncryptExampleComponent, MatrixComponent],
  imports: [
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    TextFieldModule,
  ],
  exports: [
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    TextFieldModule,
    AlphabetComponent,
    CipherOperatorComponent,
    EncryptExampleComponent,
    MatrixComponent
  ]
})
export class CiphersCommonModule { }
