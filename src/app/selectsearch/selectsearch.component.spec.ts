import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectsearchComponent } from './selectsearch.component';

describe('SelectsearchComponent', () => {
  let component: SelectsearchComponent;
  let fixture: ComponentFixture<SelectsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
