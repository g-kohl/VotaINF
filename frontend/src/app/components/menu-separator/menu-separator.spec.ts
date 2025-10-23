import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSeparator } from './menu-separator';

describe('MenuSeparator', () => {
  let component: MenuSeparator;
  let fixture: ComponentFixture<MenuSeparator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuSeparator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSeparator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
