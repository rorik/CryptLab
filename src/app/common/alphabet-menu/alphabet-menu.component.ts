import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlphabetService, IAlphabet } from 'src/app/common/alphabet/alphabet.service';
import { CustomAlphabetDialogComponent } from './custom-alphabet-dialog/custom-alphabet-dialog.component';

@Component({
  selector: 'app-alphabet-menu',
  templateUrl: './alphabet-menu.component.html',
  styleUrls: ['./alphabet-menu.component.scss']
})
export class AlphabetMenuComponent {

  public standard: IAlphabet[] = [
    this.alphabet.defaults.az26,
    this.alphabet.defaults.AZ26,
    this.alphabet.defaults.azAZ52,
    this.alphabet.defaults.azd36,
    this.alphabet.defaults.AZd36,
    this.alphabet.defaults.azAZd62,
  ];

  public spanish: IAlphabet[] = [
    this.alphabet.defaults.azn27,
    this.alphabet.defaults.AZN27,
    this.alphabet.defaults.aznAZN54,
    this.alphabet.defaults.aznd37,
    this.alphabet.defaults.AZNd37,
    this.alphabet.defaults.aznAZNd64,
  ];

  public custom: IAlphabet[] = [];

  constructor(public alphabet: AlphabetService, public dialog: MatDialog) { }

  public stopEvent(event: MouseEvent) {
    if ((event.composedPath()[0] as HTMLObjectElement).className.startsWith('mat-expansion')) {
      event.stopPropagation();
    }
  }

  public changeAlphabet(alphabet: IAlphabet): void {
    this.alphabet.alphabet = alphabet;
  }

  public createCustom(): void {
    const dialogRef = this.dialog.open(CustomAlphabetDialogComponent);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newAlphabet: IAlphabet = this.alphabet.toIAlphabet(result);
        if (newAlphabet.length > 0) {
          this.custom.push(newAlphabet);
          this.changeAlphabet(newAlphabet);
        }
      }
    });
  }

}
