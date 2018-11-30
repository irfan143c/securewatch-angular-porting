import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemogridComponent } from './demogrid.component';

describe('DemogridComponent', () => {
  let component: DemogridComponent;
  let fixture: ComponentFixture<DemogridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemogridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
