import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlastComponent } from './firstlast.component';

describe('FirstlastComponent', () => {
  let component: FirstlastComponent;
  let fixture: ComponentFixture<FirstlastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstlastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
