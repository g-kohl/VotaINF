import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCheckCircle } from './logo-check-circle';

describe('LogoCheckCircle', () => {
  let component: LogoCheckCircle;
  let fixture: ComponentFixture<LogoCheckCircle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoCheckCircle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoCheckCircle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
