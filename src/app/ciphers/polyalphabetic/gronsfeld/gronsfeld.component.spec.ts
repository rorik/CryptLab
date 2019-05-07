import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GronsfeldComponent } from './gronsfeld.component';

describe('GronsfeldComponent', () => {
  let component: GronsfeldComponent;
  let fixture: ComponentFixture<GronsfeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GronsfeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GronsfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
