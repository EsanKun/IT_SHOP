/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalesclerkComponent } from './Salesclerk.component';

describe('SalesclerkComponent', () => {
  let component: SalesclerkComponent;
  let fixture: ComponentFixture<SalesclerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesclerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesclerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
