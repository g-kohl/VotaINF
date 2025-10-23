import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWelcome } from './menu-welcome';

describe('MenuWelcome', () => {
  let component: MenuWelcome;
  let fixture: ComponentFixture<MenuWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuWelcome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuWelcome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
