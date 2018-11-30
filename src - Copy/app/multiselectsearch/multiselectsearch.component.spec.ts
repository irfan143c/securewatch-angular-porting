import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectsearchComponent } from './multiselectsearch.component';

describe('MultiselectsearchComponent', () => {
  let component: MultiselectsearchComponent;
  let fixture: ComponentFixture<MultiselectsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
