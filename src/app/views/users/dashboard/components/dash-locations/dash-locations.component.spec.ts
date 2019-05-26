import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLocationsComponent } from './dash-locations.component';

describe('DashLocationsComponent', () => {
  let component: DashLocationsComponent;
  let fixture: ComponentFixture<DashLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
