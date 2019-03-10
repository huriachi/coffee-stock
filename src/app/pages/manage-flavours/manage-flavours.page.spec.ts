import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlavoursPage } from './manage-flavours.page';

describe('ManageFlavoursPage', () => {
  let component: ManageFlavoursPage;
  let fixture: ComponentFixture<ManageFlavoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFlavoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFlavoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
