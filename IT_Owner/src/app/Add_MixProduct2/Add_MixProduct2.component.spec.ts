/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_MixProduct2Component } from './Add_MixProduct2.component';

describe('Add_MixProduct2Component', () => {
  let component: Add_MixProduct2Component;
  let fixture: ComponentFixture<Add_MixProduct2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_MixProduct2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_MixProduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
