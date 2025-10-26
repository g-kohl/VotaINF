import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputMultiline } from './text-input-multiline';

describe('TextInputMultiline', () => {
  let component: TextInputMultiline;
  let fixture: ComponentFixture<TextInputMultiline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputMultiline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputMultiline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
