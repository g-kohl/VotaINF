import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputSimple } from './text-input-simple';

describe('TextInputSimple', () => {
  let component: TextInputSimple;
  let fixture: ComponentFixture<TextInputSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputSimple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputSimple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
