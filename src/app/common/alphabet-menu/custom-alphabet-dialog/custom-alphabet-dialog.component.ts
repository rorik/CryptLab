import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAlphabet } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-custom-alphabet-dialog',
  templateUrl: './custom-alphabet-dialog.component.html',
  styleUrls: ['./custom-alphabet-dialog.component.scss']
})
export class CustomAlphabetDialogComponent {

  public alphabet = '';

  constructor(public dialogRef: MatDialogRef<CustomAlphabetDialogComponent>) {}

  public cancel(): void {
    this.dialogRef.close();
  }

  public ok(): void {
    this.dialogRef.close(this.alphabet.split(''));
  }

}
