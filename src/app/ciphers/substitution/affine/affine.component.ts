import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-affine',
  templateUrl: './affine.component.html',
  styleUrls: ['./affine.component.scss']
})
export class AffineComponent {

  public options: FormGroup;

  public keyChange = new EventEmitter<{decimation: number, shift: number}>();

  public isPure: boolean;

  public set sliderShift(value: number) {
    this.options.get('shift').setValue(value);
  }

  public get sliderShift() {
    const value = this.getShift();
    if (Math.abs(value) > this.alphabet.length) {
      return value % this.alphabet.length;
    }
    return value;
  }

  public set sliderDecimation(value: number) {
    this.options.get('decimation').setValue(value);
  }

  public get sliderDecimation() {
    const value = this.getDecimation();
    if (Math.abs(value) > this.alphabet.length) {
      return value % this.alphabet.length;
    }
    return value;
  }

  private getDecimation(): number {
    const decimation = this.options.get('decimation').value;
    return decimation === null ? 0 : decimation;
  }

  private getShift(): number {
    const shift = this.options.get('shift').value;
    return shift === null ? 0 : shift;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ decimation: 1, shift: 0 });
    this.isPure = this.calculateIsPure(this.getDecimation());
    this.options.get('shift').valueChanges.subscribe((shift: number) => this.keyChange.emit(
      {decimation: this.getDecimation(), shift}
    ));
    this.options.get('decimation').valueChanges.subscribe((decimation: number) => this.keyChange.emit(
      {decimation, shift: this.getShift()}
    ));
    this.keyChange.subscribe((values: {decimation: number, shift: number}) => this.isPure = this.calculateIsPure(values.decimation));
  }

  public affineCallback = (index: number) => index * this.getDecimation() + this.getShift();

  public encrypt(plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    return this.process(plaintext, options, this.getDecimation(), this.getShift(), true);
  }

  public encryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.encrypt(plaintext, options)

  public decrypt(cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const decimation: number = this.modInverse(this.getDecimation(), this.alphabet.length);
    return this.process(cipher, options, decimation, this.getShift(), false);
  }

  public decryptCallback = (cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.decrypt(cipher, options)

  private process(input: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean},
                  decimation: number, shift: number, isEncrypt: boolean) {
    let cipher = '';
    input.split('').forEach(char => {
      if (char === '\n' || char === ' ') {
        if (!options.ignoreWhitespace) {
          cipher += char;
        }
      } else {
        try {
          if (options.ignoreCase) {
            char = char.toLowerCase();
          }
          const operationFunction = isEncrypt ? (index => index * decimation + shift) : (index => (index - shift) * decimation);
          const result = this.alphabet.shift(char, operationFunction);
          if (result) {
            cipher += result;
          } else {
            throw RangeError();
          }
        } catch (_) {
          cipher += ' ';
        }
      }
    });
    return cipher;
  }

  private calculateIsPure(decimation: number): boolean {
    try {
      return this.gcd(decimation, this.alphabet.length) === 1;
    } catch (_) {
      return false;
    }
  }

  private modInverse(a: number, m: number) {
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN;
    }
    a = (a % m + m) % m;
    if (!a || m < 2) {
      return NaN;
    }
    // Extended gcd
    const s = [];
    let b = m;
    while (b) {
      [a, b] = [b, a % b];
      s.push({a, b});
    }
    if (a !== 1) {
      return NaN; // Has no inverse
    }
    // Iterative modular inverse
    let x = 1;
    let y = 0;
    for (let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)];
    }
    return (y % m + m) % m;
  }

  private gcd(a: number, b: number) {
    if (a === 0 || b === 0 || a % 1 !== 0 || b % 1 !== 0) {
      throw new RangeError('Both arguments must be non-zero integers, but got: [' + a + ', ' + b + ']');
    }
    a = Math.abs(a);
    b = Math.abs(b);

    if (b > a) {
      const temp = a;
      a = b;
      b = temp;
    }

    while (true) {
      a %= b;
      if (a === 0) {
        return b;
      }
      b %= a;
      if (b === 0) {
        return a;
      }
    }
  }

}
