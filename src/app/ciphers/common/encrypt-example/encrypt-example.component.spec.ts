import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptExampleComponent } from './encrypt-example.component';

describe('EncryptExampleComponent', () => {
  let component: EncryptExampleComponent;
  let fixture: ComponentFixture<EncryptExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
