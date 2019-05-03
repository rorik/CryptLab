import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  @Output() sidenavToggle = new EventEmitter<null>();

  public handleClick() {
    this.sidenavToggle.emit();
  }

  ngOnInit() {}
}
