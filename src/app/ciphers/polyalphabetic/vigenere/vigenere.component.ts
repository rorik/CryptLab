import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-vigenere',
  templateUrl: './vigenere.component.html',
  styleUrls: ['./vigenere.component.scss']
})
export class VigenereComponent {

  public options: FormGroup;

  public keyChange = new EventEmitter<string>();

  private getKey(): string {
    return this.options.get('key').value;
  }

  constructor(public alphabet: AlphabetService, formBuilder: FormBuilder) {
    this.options = formBuilder.group({ key: '' });
    this.options.get('key').valueChanges.subscribe((key: string) => {
      if(key.indexOf(' ') !== -1) {
        this.options.get('key').setValue(key.replace(' ', ''))
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

  public decrypt(plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    const key: string = this.getKey();
    return this.process(plaintext, options, key, false);
  }

  public decryptCallback = (plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) =>
    this.decrypt(plaintext, options)

  private process(plaintext: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}, key: string, isEncrypt: boolean) {
    if (!options) {
      options = {ignoreWhitespace: false, ignoreCase: true};
    }
    if (key.length === 0) {
      key = this.alphabet.alphabet[0];
    }
    if (options.ignoreCase) {
      plaintext = plaintext.toLowerCase();
      key = key.toLowerCase();
    }
    let keyword: string = key;
    while (keyword.length < plaintext.length) {
      keyword += key;
    }
    let cipher: string = '';
    for (let i = 0; i < plaintext.length; i++) {
      if (plaintext[i] === '\n' || plaintext[i] === ' ') {
        if (!options.ignoreWhitespace) {
          cipher += plaintext[i];
        }
      } else {
        try {
          cipher += this.alphabet.shift(plaintext[i], keyword[i], isEncrypt);
        } catch (_) {
          cipher += ' ';
        }
      } 
    }
    return cipher;
  }

}
