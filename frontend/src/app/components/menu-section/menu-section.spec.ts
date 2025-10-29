import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSection } from './menu-section';

describe('MenuSection', () => {
  let component: MenuSection;
  let fixture: ComponentFixture<MenuSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
