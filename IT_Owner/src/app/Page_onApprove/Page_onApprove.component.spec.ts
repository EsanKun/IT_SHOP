/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Page_onApproveComponent } from './Page_onApprove.component';

describe('Page_onApproveComponent', () => {
  let component: Page_onApproveComponent;
  let fixture: ComponentFixture<Page_onApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page_onApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page_onApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
