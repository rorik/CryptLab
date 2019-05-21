import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public encrypt(input: string, options: {ignoreWhitespace: boolean, ignoreCase: boolean}) {
    let output = '';
    input.split('').forEach(char => {
      if (char !== '\n' && char !== ' ' || !options.ignoreWhitespace) {
        output += char;
      }
    });
    if (options.ignoreCase) {
      output = output.toLowerCase();
    }
    return output;
  }

}
