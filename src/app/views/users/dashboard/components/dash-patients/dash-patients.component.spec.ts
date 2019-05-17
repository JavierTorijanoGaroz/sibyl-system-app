import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPatientsComponent } from './dash-patients.component';

describe('DashPatientsComponent', () => {
  let component: DashPatientsComponent;
  let fixture: ComponentFixture<DashPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
