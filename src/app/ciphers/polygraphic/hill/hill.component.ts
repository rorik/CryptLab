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
        this.isInvertible = sqrt === 0 ? true : !!this.invertMatrix(this.convertMatrix(this.matrix));
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
        keyMatrix = this.invertMatrix(keyMatrix);
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
  private invertMatrix(matrix: number[][]): number[][] {
    if (matrix.length !== matrix[0].length) {
      return null;
    }

    // create the identity matrix, and a copy of the original

    const dim = matrix.length;
    const copy: number[][] = matrix.map(row => row.copyWithin(-1, -1));
    const identity: number[][] = [];

    for (let i = 0; i < dim; i++) {
      const row = Array(dim).fill(0);
      row[i] = 1;
      identity.push(row);
    }

    // Perform elementary row operations
    for (let i = 0; i < dim; i += 1) {
      // get the element e on the diagonal
      let e = copy[i][i];

      // if we have a 0 on the diagonal (we'll need to swap with a lower row)
      if (e === 0) {
        // look through every row below the i'th row
        for (let ii = i + 1; ii < dim; ii += 1) {
          // if the ii'th row has a non-0 in the i'th col
          if (copy[ii][i] !== 0) {
            // it would make the diagonal have a non-0 so swap it
            for (let j = 0; j < dim; j++) {
              e = copy[i][j]; // temp store i'th row
              copy[i][j] = copy[ii][j]; // replace i'th row by ii'th
              copy[ii][j] = e; // repace ii'th by temp
              e = identity[i][j]; // temp store i'th row
              identity[i][j] = identity[ii][j]; // replace i'th row by ii'th
              identity[ii][j] = e; // repace ii'th by temp
            }
            // don't bother checking other rows since we've swapped
            break;
          }
        }
        // get the new diagonal
        e = copy[i][i];
        // if it's still 0, not invertible (error)
        if (e === 0) {
          return null;
        }
      }

      // Scale this row down by e (so we have a 1 on the diagonal)
      for (let j = 0; j < dim; j++) {
        copy[i][j] = copy[i][j] / e; // apply to original matrix
        identity[i][j] = identity[i][j] / e; // apply to identity
      }

      // Subtract this row (scaled appropriately for each row) from ALL of
      // the other rows so that there will be 0's in this column in the
      // rows above and below this one
      for (let ii = 0; ii < dim; ii++) {
        // Only apply to other rows (we want a 1 on the diagonal)
        if (ii === i) {
          continue;
        }

        // We want to change this element to 0
        e = copy[ii][i];

        // Subtract (the row above(or below) scaled by e) from (the
        // current row) but start at the i'th column and assume all the
        // stuff left of diagonal is 0 (which it should be if we made this
        // algorithm correctly)
        for (let j = 0; j < dim; j++) {
          copy[ii][j] -= e * copy[i][j]; // apply to original matrix
          identity[ii][j] -= e * identity[i][j]; // apply to identity
        }
      }
    }

    // we've done all operations, C should be the identity
    // identity matrix should be the inverse:
    return identity;
  }
}
