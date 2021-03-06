/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GymsComponent } from './Gyms.component';

describe('GymsComponent', () => {
  let component: GymsComponent;
  let fixture: ComponentFixture<GymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
