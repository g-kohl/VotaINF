import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionItem } from './accordion-item';

describe('AccordionItem', () => {
  let component: AccordionItem;
  let fixture: ComponentFixture<AccordionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
