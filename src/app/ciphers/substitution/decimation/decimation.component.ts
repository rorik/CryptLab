import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-decimation',
  templateUrl: './decimation.component.html',
  styleUrls: ['./decimation.component.scss']
})
export class DecimationComponent {
  public options: FormGroup;

  public decimationChange = new EventEmitter<number>();

  public isPure: boolean;

  public set sliderDecimation(value: number) {
    this.options.get('decimation').setValue(value);
  }

  public get sliderDecimation() {
    const value = this.getDecimation();
    if (Math.abs(value) > this.alphabet.alphabet.length) {
      return value % this.alphabet.length;
    }
    return value;
  }

  private getDecimation(): number {
    const decimation = this.options.get('decimation').value;
    return decimation === null ? 0 : decimation;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ decimation: 1 });
    this.isPure = this.calculateIsPure(this.getDecimation());
    this.options.get('decimation').valueChanges.subscribe((decimation: number) => this.decimationChange.emit(decimation));
    this.decimationChange.subscribe((decimation: number) => (this.isPure = this.calculateIsPure(decimation)));
  }

  public decimationCallback = (index: number) => index * this.getDecimation();

  public encrypt(plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const decimation: number = this.getDecimation();
    return this.process(plaintext, options, decimation);
  }

  public encryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.encrypt(plaintext, options)

  public decrypt(cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const decimation: number = this.modInverse(this.getDecimation(), this.alphabet.length);
    return this.process(cipher, options, decimation);
  }

  public decryptCallback = (cipher: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.decrypt(cipher, options)

  private process(input: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}, decimation: number) {
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
          const result = this.alphabet.shift(char, index => index * decimation);
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
