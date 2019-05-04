import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AlphabetService } from './../../../common/alphabet/alphabet.service';

@Component({
  selector: 'app-cipher-caesar',
  templateUrl: './caesar.component.html',
  styleUrls: ['./caesar.component.scss']
})
export class CaesarComponent {
  public options: FormGroup;

  public shiftChange = new EventEmitter<number>();

  public set sliderShift(value: number) {
    this.options.get('shift').setValue(value);
  }

  public get sliderShift() {
    const value = this.options.get('shift').value;
    if (Math.abs(value) > this.alphabet.alphabet.length) {
      return value % this.alphabet.length;
    }
    return value;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ shift: 0 });
    this.options.get('shift').valueChanges.subscribe(shift => this.shiftChange.emit(shift));
  }

  public encrypt(plaintext: string, options: {ignoreWhitespace: boolean}) {
    const shift: number = this.options.get('shift').value;
    return this.process(plaintext, options.ignoreWhitespace, shift);
  }

  public encryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean}) => this.encrypt(plaintext, options);

  public decrypt(plaintext: string, options: {ignoreWhitespace: boolean}) {
    const shift: number = this.options.get('shift').value;
    return this.process(plaintext, options.ignoreWhitespace, -shift);
  }

  public decryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean}) => this.decrypt(plaintext, options);

  private process(plaintext: string, ignoreWhitespace: boolean, shift: number) {
    let cipher = '';
    plaintext.split('').forEach(char => {
      if (char === '\n' || char === ' ') {
        if (!ignoreWhitespace) {
          cipher += char;
        }
      } else {
        try {
          cipher += this.alphabet.shift(char, shift);
        } catch (_) {
          cipher += ' ';
        }
      }
    });
    return cipher;
  }
}
