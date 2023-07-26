/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Owner_NavComponent } from './Owner_Nav.component';

describe('Owner_NavComponent', () => {
  let component: Owner_NavComponent;
  let fixture: ComponentFixture<Owner_NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Owner_NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Owner_NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
