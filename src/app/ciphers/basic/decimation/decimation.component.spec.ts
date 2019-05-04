import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimationComponent } from './decimation.component';

describe('DecimationComponent', () => {
  let component: DecimationComponent;
  let fixture: ComponentFixture<DecimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
