import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavoursPage } from './flavours.page';

describe('FlavoursPage', () => {
  let component: FlavoursPage;
  let fixture: ComponentFixture<FlavoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
