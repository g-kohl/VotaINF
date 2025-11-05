import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeeting } from './new-meeting';

describe('NewMeeting', () => {
  let component: NewMeeting;
  let fixture: ComponentFixture<NewMeeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMeeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMeeting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
