import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffineComponent } from './affine.component';

describe('AffineComponent', () => {
  let component: AffineComponent;
  let fixture: ComponentFixture<AffineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
