import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDate } from './form-date';

describe('FormDate', () => {
  let component: FormDate;
  let fixture: ComponentFixture<FormDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
