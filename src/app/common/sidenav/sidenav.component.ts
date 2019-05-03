import { element } from 'protractor';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public readonly elementTypes = NavElementType;
  public readonly navElements: (TextElement|DividerElement)[] = [
    { type: NavElementType.TEXT, label: 'AAA', icon: 'info', path: ['/path'] },
    { type: NavElementType.TEXT, label: 'AAA', icon: 'info', path: ['/path'] },
    { type: NavElementType.DIVIDER },
    { type: NavElementType.TEXT, label: 'AAA' },
    { type: NavElementType.TEXT, label: 'AAA', icon: 'info', path: ['/path'] }
  ];
}

enum NavElementType {
  TEXT,
  DIVIDER,
  MENU
}

interface INavElement {
  readonly type: NavElementType;
}

class TextElement implements INavElement {
  public readonly type: NavElementType.TEXT;
  public readonly label: string;
  public readonly icon?: string;
  public readonly path?: any[];
}

class DividerElement implements INavElement {
  public readonly type: NavElementType.DIVIDER;
}
