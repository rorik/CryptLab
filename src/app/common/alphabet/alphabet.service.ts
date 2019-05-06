import { IAlphabet } from './alphabet.service';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';

export const defaults: AlphabetDictionary = {
  az26: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  azd36: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  private alphabetSet: string[];

  private alphabetLen: number;

  @Input() public set alphabet(value: string[]) {
    value.forEach(char => {
      if (char.length !== 1) {
        throw new TypeError('Alphabet elements must be a single character, but got: [' + char + ']');
      }
    });
    const previous = this.alphabetObject;
    this.alphabetSet = value;
    this.alphabetLen = value.length;
    this.alphabetChange.emit({new: this.alphabetObject, old: previous});
  }

  public get alphabet(): string[] {
    return this.alphabetSet;
  }

  public get length(): number {
    return this.alphabetLen;
  }

  public get defaults(): AlphabetDictionary {
    return defaults;
  }

  private get alphabetObject(): IAlphabet {
    return {alphabet: this.alphabet, length: this.length};
  }

  @Output() alphabetChange = new EventEmitter<{new: IAlphabet, old: IAlphabet}>();

  public set(alphabet: string[]|IAlphabet) {
      if (alphabet instanceof Array) {
        this.alphabet = alphabet;
      } else if ('alphabet' in alphabet) {
        this.alphabet = alphabet.alphabet;
      } else {
        throw new TypeError('Expected list of characters or object with alphabet attribute');
      }
  }

  public shift(char: string, shift: string|number|((index: number, rightShift?: boolean) => number), rightShift = true): string {
    const index = this.alphabet.indexOf(char);
    if (index === -1) {
      throw new TypeError('Char not found, got: [' + char + ']');
    }

    if (typeof shift === 'string') {
      const shiftChar: string = shift;
      shift = this.alphabet.indexOf(shiftChar);
      if (shift === -1) {
        throw new TypeError('Shift char not found, got: [' + shiftChar + ']');
      }
    }

    let target: number;
    if (shift instanceof Function) {
      target = shift(index, rightShift);
    } else {
      if (rightShift) {
        target = index + shift;
      } else {
        target = index - shift;
      }
      target = ((target % this.alphabet.length) + this.alphabet.length) % this.alphabet.length;
      // console.log((rightShift ? 'Right' : 'Left') + ' shift ' + index + ' (' + this.alphabet[index] +
      //   ') ^ ' + shift + ' (' + this.alphabet[shift] + ') = ' + target + '(' + this.alphabet[target] + ')');
    }

    if (target % 1 !== 0 || Number.isNaN(target) || target == null || target === undefined) {
      return null;
    }

    return this.alphabet[((target % this.alphabet.length) + this.alphabet.length) % this.alphabet.length];
  }


  constructor() {
    this.alphabet = this.defaults.az26;
  }
}

export interface IAlphabet {
  alphabet: string[];
  length: number;
}

interface AlphabetDictionary {
  [key: string]: string[];
}
