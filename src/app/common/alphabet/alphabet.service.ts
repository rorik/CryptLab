import { IAlphabet } from './alphabet.service';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';

export const defaults: AlphabetDictionary = {
  az26: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    name: '[a-z]'
  },
  AZ26: {alphabet:
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    name: '[A-Z]'
  },
  azAZ52: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    name: '[a-zA-Z]'
  },
  azd36: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[a-z0-9]'
  },
  AZd36: {alphabet:
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[A-Z0-9]'
  },
  azAZd62: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[a-zA-Z0-9]'
  },
  azn27: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    name: '[a-zñ]'
  },
  AZN27: {alphabet:
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    name: '[A-ZÑ]'
  },
  aznAZN54: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    name: '[a-zñA-ZÑ]'
  },
  aznd37: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[a-zñ0-9]'
  },
  AZNd37: {alphabet:
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[A-ZÑ0-9]'
  },
  aznAZNd64: {alphabet:
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    name: '[a-zñA-ZÑ0-9]'
  },
};

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  private selectedAlphabet: IAlphabet;

  @Input() public set alphabet(value: string[]|IAlphabet) {
    const previous = this.selectedAlphabet;
    if (!(value instanceof Array)) {
      this.selectedAlphabet = {alphabet: value.alphabet, length: value.alphabet.length, name: value.name};
    } else {
      this.selectedAlphabet = {alphabet: value, length: value.length};
    }
    if (!this.selectedAlphabet.name) {
      this.selectedAlphabet.name = this.getName(this.selectedAlphabet.alphabet);
    }
    this.selectedAlphabet.alphabet.forEach(char => {
      if (char.length !== 1) {
        throw new TypeError('Alphabet elements must be a single character, but got: [' + char + ']');
      }
    });

    this.alphabetChange.emit({new: this.selectedAlphabet, old: previous});
  }

  public get elements(): string[] {
    return this.selectedAlphabet.alphabet;
  }

  public get length(): number {
    return this.selectedAlphabet.length;
  }

  public get defaults(): AlphabetDictionary {
    return defaults;
  }

  @Output() alphabetChange = new EventEmitter<{new: IAlphabet, old: IAlphabet}>();

  public get(element: number|string, coalesce: number = 0): string {
    if (typeof element === 'string') {
      const index = this.selectedAlphabet.alphabet.indexOf(element);
      return index === -1 ? this.selectedAlphabet.alphabet[coalesce] : element;
    }
    return this.selectedAlphabet.alphabet[this.indexMod(element)];
  }

  public getIndex(element: number|string, coalesce: number = 0): number {
    if (typeof element === 'string') {
      const index = this.selectedAlphabet.alphabet.indexOf(element);
      return index === -1 ? coalesce : index;
    }
    return this.indexMod(element);
  }

  public shift(char: string, shift: string|number|((index: number, rightShift?: boolean) => number), rightShift = true): string {
    const index = this.selectedAlphabet.alphabet.indexOf(char);
    if (index === -1) {
      throw new TypeError('Char not found, got: [' + char + ']');
    }

    if (typeof shift === 'string') {
      const shiftChar: string = shift;
      shift = this.selectedAlphabet.alphabet.indexOf(shiftChar);
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
    }

    if (target % 1 !== 0 || Number.isNaN(target) || target == null || target === undefined) {
      return null;
    }

    return this.selectedAlphabet.alphabet[this.indexMod(target)];
  }

  private indexMod(index: number) {
    return ((index % this.length) + this.length) % this.length;
  }

  private getName(alphabet: string[]) {
    return `[${alphabet[0]}-${alphabet[alphabet.length - 1]}]`;
  }

  public toIAlphabet(alphabet: string[], name?: string): IAlphabet {
    alphabet.forEach(char => {
      if (char.length !== 1) {
        throw new TypeError('Alphabet elements must be a single character, but got: [' + char + ']');
      }
    });
    return {alphabet, length: alphabet.length, name: name ? name : this.getName(alphabet)};
  }


  constructor() {
    this.alphabet = this.defaults.az26;
  }
}

export interface IAlphabet {
  alphabet: string[];
  length?: number;
  name?: string;
}

interface AlphabetDictionary {
  [key: string]: IAlphabet;
}
