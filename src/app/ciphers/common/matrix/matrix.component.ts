import { Component, Input } from '@angular/core';
import { AlphabetService } from 'src/app/common/alphabet/alphabet.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent {

  public matrix: (number|string)[][] = [];

  @Input() set values(values: (number|string)[][]) {
    this.matrix = values;
  }

  @Input() useAlphabet = true;

  @Input() maxRank = 3;

  @Input() coalesce = 0;

  public get rows(): number {
    return Math.min(this.matrix.length, this.maxRank + 1);
  }

  public get visibleHeight(): number {
    return Math.min(this.matrix.length, this.maxRank);
  }

  public get valueRows(): number[] {
    return Array(Math.min(this.matrix.length, this.maxRank)).fill(0).map((x, i) => i);
  }

  private get longestRowLength(): number {
    return Math.max(...this.matrix.map(row => row.length));
  }

  public get cols(): number {
    return Math.min(this.longestRowLength, this.maxRank + 1);
  }

  public get visibleWidth(): number {
    return Math.min(this.longestRowLength, this.maxRank);
  }

  public get valueCols(): number[] {
    return Array(Math.min(this.longestRowLength, this.maxRank)).fill(0).map((x, i) => i);
  }

  public isCenterRow(row: number): boolean {
    if (this.matrix.length > this.maxRank) {
      return Math.floor(this.maxRank / 2) === row;
    } else {
      return Math.floor(this.matrix.length / 2) === row;
    }
  }

  public isCenterCol(row: number): boolean {
    const matrixWidth = this.longestRowLength;
    if (matrixWidth > this.maxRank) {
      return Math.floor(this.maxRank / 2) === row;
    } else {
      return Math.floor(matrixWidth / 2) === row;
    }
  }


  constructor(public alphabet: AlphabetService) { }

}
