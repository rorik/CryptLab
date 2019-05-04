import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherOperatorComponent } from './cipher-operator.component';

describe('CipherOperatorComponent', () => {
  let component: CipherOperatorComponent;
  let fixture: ComponentFixture<CipherOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CipherOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CipherOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
