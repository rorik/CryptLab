import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlphabetDialogComponent } from './custom-alphabet-dialog.component';

describe('CustomAlphabetDialogComponent', () => {
  let component: CustomAlphabetDialogComponent;
  let fixture: ComponentFixture<CustomAlphabetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAlphabetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAlphabetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
