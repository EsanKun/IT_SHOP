/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Sales_NavComponent } from './Sales_Nav.component';

describe('Sales_NavComponent', () => {
  let component: Sales_NavComponent;
  let fixture: ComponentFixture<Sales_NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sales_NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sales_NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
