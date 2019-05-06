import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaufortVariantComponent } from './beaufort-variant.component';

describe('BeaufortVariantComponent', () => {
  let component: BeaufortVariantComponent;
  let fixture: ComponentFixture<BeaufortVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaufortVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaufortVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
