import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-gronsfeld',
  templateUrl: './gronsfeld.component.html',
  styleUrls: ['./gronsfeld.component.scss']
})
export class GronsfeldComponent {

  public options: FormGroup;

  public keyChange = new EventEmitter<string>();

  private getKey(): string {
    return this.options.get('key').value;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ key: '' });
    this.options.get('key').valueChanges.subscribe((key: string) => {
      let validated = '';
      for (let i = 0; i < key.length; i++) {
        if (!isNaN(parseInt(key.charAt(i), 10))) {
          validated += key.charAt(i);
        }
      }

      if (validated.length !== key.length) {
        this.options.get('key').setValue(validated);
      } else {
        this.keyChange.emit(key);
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

  private process(input: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}, key: string|number[], isEncrypt: boolean) {
    if (!options) {
      options = {ignoreWhitespace: false, ignoreCase: true};
    }
    if (typeof key === 'string') {
      if (key.length === 0 || isNaN(parseInt(key, 10))) {
        key = [0];
      } else {
        const keyString = key;
        key = [];
        for (let i = 0; i < keyString.length; i++) {
          key.push(+keyString.charAt(i));
        }
      }
    }
    if (key.indexOf(NaN) !== -1) {
      key = [0];
    }
    if (options.ignoreCase) {
      input = input.toLowerCase();
    }
    let keyword: number[] = key;
    while (keyword.length < input.length) {
      keyword = keyword.concat(key);
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

}
