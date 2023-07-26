/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Warehouse_NavComponent } from './Warehouse_Nav.component';

describe('Warehouse_NavComponent', () => {
  let component: Warehouse_NavComponent;
  let fixture: ComponentFixture<Warehouse_NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Warehouse_NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Warehouse_NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
