import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-encrypt-example',
  templateUrl: './encrypt-example.component.html',
  styleUrls: ['./encrypt-example.component.scss']
})
export class EncryptExampleComponent implements OnInit {

  private plaintextString: string;

  public cipher: string[];

  private keyChangeListenerSubscription: Subscription;

  @Input() public set plaintext(value: string|string[]) {
    if (value instanceof Array) {
      this.plaintextString = value.join('');
    } else {
      this.plaintextString = value;
    }
    this.encrypt();
  }

  @Input() public encryptFunction: (plaintext: string) => string;

  @Input() set keyChangeListener(keyChangeListener: EventEmitter<any>) {
    if (this.keyChangeListenerSubscription) {
      this.keyChangeListenerSubscription.unsubscribe();
    }
    if (keyChangeListener) {
      keyChangeListener.subscribe(() => this.encrypt());
    }
  }

  private encrypt() {
    let cipher: string;
    if (this.encryptFunction) {
      cipher = this.encryptFunction(this.plaintextString);
    } else {
      cipher = this.plaintextString;
    }
    this.cipher = cipher.split('');
  }

  constructor(private alphabet: AlphabetService) { }

  ngOnInit() {
    if (!this.plaintextString) {
      this.plaintext = this.alphabet.alphabet.join('');
    }
  }

}
