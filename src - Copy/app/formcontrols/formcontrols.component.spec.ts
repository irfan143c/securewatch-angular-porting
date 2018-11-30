import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontrolsComponent } from './formcontrols.component';

describe('FormcontrolsComponent', () => {
  let component: FormcontrolsComponent;
  let fixture: ComponentFixture<FormcontrolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcontrolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcontrolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
