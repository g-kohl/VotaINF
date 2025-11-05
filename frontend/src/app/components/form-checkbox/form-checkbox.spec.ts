import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckbox } from './form-checkbox';

describe('FormCheckbox', () => {
  let component: FormCheckbox;
  let fixture: ComponentFixture<FormCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
