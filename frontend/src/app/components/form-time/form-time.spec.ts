import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTime } from './form-time';

describe('FormTime', () => {
  let component: FormTime;
  let fixture: ComponentFixture<FormTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
