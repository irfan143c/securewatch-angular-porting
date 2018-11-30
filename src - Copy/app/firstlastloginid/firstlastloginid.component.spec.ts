import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlastloginidComponent } from './firstlastloginid.component';

describe('FirstlastloginidComponent', () => {
  let component: FirstlastloginidComponent;
  let fixture: ComponentFixture<FirstlastloginidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstlastloginidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstlastloginidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
