import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgridComponent } from './showgrid.component';

describe('ShowgridComponent', () => {
  let component: ShowgridComponent;
  let fixture: ComponentFixture<ShowgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
