import { Component, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cipher-operator',
  templateUrl: './cipher-operator.component.html',
  styleUrls: ['./cipher-operator.component.scss']
})
export class CipherOperatorComponent {
  public formGroup: FormGroup;

  private keyChangeListenerSubscription: Subscription;

  @Input() isEncrypt: false;
  @Input() encrypt: (plaintext: string, options: { ignoreWhitespace: boolean }) => string;
  @Input() decrypt: (plaintext: string, options: { ignoreWhitespace: boolean }) => string;
  @Input() set keyChangeListener(keyChangeListener: EventEmitter<any>) {
    if (this.keyChangeListenerSubscription) {
      this.keyChangeListenerSubscription.unsubscribe();
    }
    if (keyChangeListener) {
      keyChangeListener.subscribe(() => this.auto());
    }
  }

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({ input: '', output: '', auto: false, ignoreWhitespace: false });
    this.formGroup.get('input').valueChanges.subscribe(() => this.auto());
    this.formGroup.get('ignoreWhitespace').valueChanges.subscribe(() => this.auto());
  }

  public auto() {
    if (this.formGroup.get('auto').value) {
      this.process();
    }
  }

  private process() {
    const input: string = this.formGroup.get('input').value;
    const options = { ignoreWhitespace: this.formGroup.get('ignoreWhitespace').value };
    const output: string = this.isEncrypt ? this.encrypt(input, options) : this.decrypt(input, options);
    this.formGroup.get('output').setValue(output);
  }
}
