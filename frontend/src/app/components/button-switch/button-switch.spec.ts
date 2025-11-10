import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSwitch } from './button-switch';

describe('ButtonSwitch', () => {
  let component: ButtonSwitch;
  let fixture: ComponentFixture<ButtonSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSwitch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
