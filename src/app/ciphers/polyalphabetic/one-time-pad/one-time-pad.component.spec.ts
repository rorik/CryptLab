import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimePadComponent } from './one-time-pad.component';

describe('OneTimePadComponent', () => {
  let component: OneTimePadComponent;
  let fixture: ComponentFixture<OneTimePadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTimePadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
