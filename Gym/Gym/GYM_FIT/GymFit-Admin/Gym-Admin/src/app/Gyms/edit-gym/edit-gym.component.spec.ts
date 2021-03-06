/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditGymComponent } from './edit-gym.component';

describe('EditGymComponent', () => {
  let component: EditGymComponent;
  let fixture: ComponentFixture<EditGymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
