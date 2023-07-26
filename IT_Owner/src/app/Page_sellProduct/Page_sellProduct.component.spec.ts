/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Page_sellProductComponent } from './Page_sellProduct.component';

describe('Page_sellProductComponent', () => {
  let component: Page_sellProductComponent;
  let fixture: ComponentFixture<Page_sellProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page_sellProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page_sellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
