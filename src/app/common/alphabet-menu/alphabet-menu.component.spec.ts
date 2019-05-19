import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetMenuComponent } from './alphabet-menu.component';

describe('AlphabetMenuComponent', () => {
  let component: AlphabetMenuComponent;
  let fixture: ComponentFixture<AlphabetMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphabetMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
