import { Component, Input } from '@angular/core';
import { AlphabetService } from './../../../common/alphabet/alphabet.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent {

  @Input() public shiftFunction: (index: number) => number;

  constructor(public alphabet: AlphabetService) {}

}
