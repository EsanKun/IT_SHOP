/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_MixproductComponent } from './Add_Mixproduct.component';

describe('Add_MixproductComponent', () => {
  let component: Add_MixproductComponent;
  let fixture: ComponentFixture<Add_MixproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_MixproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_MixproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
