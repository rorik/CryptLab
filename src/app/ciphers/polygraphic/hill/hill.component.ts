import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html',
  styleUrls: ['./hill.component.scss']
})
export class HillComponent {

  public options: FormGroup;

  public keyChange = new EventEmitter<string>();

  public matrix: string[][] = [];

  private getKey(): string {
    return this.options.get('key').value;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ key: '' });
    this.options.get('key').valueChanges.subscribe((key: string) => {
      if (key.indexOf(' ') !== -1) {
        this.options.get('key').setValue(key.replace(' ', ''));
      } else {
        this.keyChange.emit(key);
      }
    });
    this.keyChange.subscribe((key: string) => {
      const sqrtFloat = Math.sqrt(key.length);
      const sqrt = Math.floor(sqrtFloat);
      if (sqrtFloat % 1 === 0 || sqrt !== this.matrix.length) {
        const newMatrix: string[][] = [];
        for (let i = 0; i < sqrt; i++) {
          const row: string[] = [];
          for (let j = 0; j < sqrt; j++) {
            row.push(key.charAt(i * sqrt + j));
          }
          newMatrix.push(row);
        }
        this.matrix = newMatrix;
      }
    });
  }

  public encrypt(plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const key: string = this.getKey();
    return this.process(plaintext, options, key, true);
  }

  public encryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.encrypt(plaintext, options)

  public decrypt(cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const key: string = this.getKey();
    return this.process(cipher, options, key, false);
  }

  public decryptCallback = (cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.decrypt(cipher, options)

  private process(input: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}, key: string, isEncrypt: boolean) {
    if (!options) {
      options = {ignoreWhitespace: false, ignoreCase: true};
    }
    if (key.length === 0) {
      key = this.alphabet.alphabet[0];
    }
    if (options.ignoreCase) {
      input = input.toLowerCase();
      key = key.toLowerCase();
    }
    let keyword: string = key;
    while (keyword.length < input.length) {
      keyword += key;
    }
    let cipher = '';
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '\n' || input[i] === ' ') {
        if (!options.ignoreWhitespace) {
          cipher += input[i];
        }
      } else {
        try {
          cipher += this.alphabet.shift(input[i], keyword[i], isEncrypt);
        } catch (_) {
          cipher += ' ';
        }
      }
    }
    return cipher;
  }

  private multiplyMatrix(a: number[][], b: number[][]) {
      const result: number[][] = [];
      a.forEach(aRow => {
        const row = new Array(b[0].length);
        for (let c = 0; c < b[0].length; ++c) {
          row[c] = 0;
          for (let i = 0; i < a[0].length; ++i) {
            row[c] += aRow[i] * b[i][c];
          }
        }
        result.push(row);
      });
      return result;
  }

}
