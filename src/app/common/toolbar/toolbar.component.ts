import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  @Output() sidenavToggle = new EventEmitter<null>();

  public handleClick(): void {
    this.sidenavToggle.emit();
  }

  public changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ngOnInit() {}
}
