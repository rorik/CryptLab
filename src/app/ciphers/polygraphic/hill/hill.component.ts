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

  public isInvertible = true;

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
        this.isInvertible = sqrt === 0 ? true : !!this.invertMatrix(this.convertMatrix(this.matrix), this.alphabet.length);
      }
    });
  }

  public encrypt(plaintext: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }) {
    return this.process(plaintext, options, true);
  }

  public encryptCallback = (plaintext: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }) => this.encrypt(plaintext, options);

  public decrypt(cipher: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }) {
    return this.process(cipher, options, false);
  }

  public decryptCallback = (cipher: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }) => this.decrypt(cipher, options);

  private process(input: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }, isEncrypt: boolean) {
    if (input.length === 0) {
      return '';
    }
    if (!options) {
      options = { ignoreWhitespace: false, ignoreCase: true };
    }
    if (options.ignoreCase) {
      input = input.toLowerCase();
    }

    if (input.length > this.matrix.length) {
      input = input.substring(0, this.matrix.length);
    } else {
      while (input.length < this.matrix.length) {
        input += this.alphabet.get(0);
      }
    }

    const inputMatrix: number[][] = [input.split('').map(char => this.alphabet.getIndex(char))];
    let keyMatrix: number[][] = [];
    if (this.matrix.length === 0) {
      keyMatrix = Array(input.length).fill(Array(input.length).fill(0));
    } else {
      keyMatrix = this.convertMatrix(this.matrix);
      if (!isEncrypt) {
        keyMatrix = this.invertMatrix(keyMatrix, this.alphabet.length);
      }
    }
    const resultMatrix = this.multiplyMatrix(inputMatrix, keyMatrix);

    return resultMatrix[0].map(index => this.alphabet.get(index)).join('');
  }

  private convertMatrix(matrix: string[][]): number[][] {
    return matrix.map(row => row.map(char => this.alphabet.getIndex(char)));
  }

  private multiplyMatrix(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [];
    a.forEach(aRow => {
      const row: number[] = new Array(b[0].length);
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

  /**
   * Invert a matrix
   * @param matrix the matrix to be inverted, must be a square matrix
   */
  private invertMatrix(matrix: number[][], p: number): number[][] {
    const inverse: number[][] = [];
    this.rowReductionField(matrix, p).forEach(row => {
      inverse.push(row.slice(matrix.length));
    });
    return inverse;
  }

  private rowReductionField(matrix: number[][], field: number): number[][] {
    const augmented: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      const identityRow = Array(matrix.length).fill(0);
      identityRow[i] = 1;
      augmented.push(matrix[i].concat(identityRow));
    }
    for (let i = 0; i < augmented.length; i++) {
      let ratio = this.modInv(augmented[i][i], field);
      if (!ratio) {
        for (let j = i + 1; j < augmented.length; j++) {
          const otherRatio: number = this.modInv(augmented[j][i], field);
          if (otherRatio) {
            const old: number[] = augmented[i];
            augmented[i] = augmented[j];
            augmented[j] = old;
            ratio = otherRatio;
          }
        }
        if (!ratio) {
          return null;
        }
      }
      for (let j = 0; j < augmented[i].length; j++) {
        augmented[i][j] = (augmented[i][j] * ratio) % field;
      }
      for (let j = 0; j < augmented.length; j++) {
        if (j !== i) {
          for (let k = augmented[j].length - 1; k >= 0; k--) {
            augmented[j][k] = this.absoluteMod(augmented[i][k] * - augmented[j][i] + augmented[j][k], field);
          }
        }
      }
    }
    return augmented;
  }

  private absoluteMod(a: number, m: number) {
    let mod = a % m;
    if (mod < 0) {
      mod = (mod + m) % m;
    }
    return mod;
  }

  private modInv(a: number, m: number): number {
    const gcd = this.egcd(a, m);
    if (!gcd || gcd[0] !== 1) {
      return null;
    }
    return gcd[1] % m;
  }

  private egcd(a: number, b: number) {
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
      return [Infinity, Infinity, Infinity];
    }
    // Checks if a or b are decimals
    if ((a % 1 !== 0) || (b % 1 !== 0)) {
      return null;
    }
    const signX = (a < 0) ? -1 : 1;
    const signY = (b < 0) ? -1 : 1;
    let x = 0;
    let y = 1;
    let u = 1;
    let v = 0;
    let q: number;
    let r: number;
    let m: number;
    let n: number;
    a = Math.abs(a);
    b = Math.abs(b);
    while (a !== 0) {
      q = Math.floor(b / a);
      r = b % a;
      m = x - u * q;
      n = y - v * q;
      b = a;
      a = r;
      x = u;
      y = v;
      u = m;
      v = n;
    }
    return [b, signX * x, signY * y];
  }
}
