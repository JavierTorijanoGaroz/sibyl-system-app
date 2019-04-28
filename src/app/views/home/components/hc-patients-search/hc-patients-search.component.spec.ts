import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcPatientsSearchComponent } from './hc-patients-search.component';

describe('HcPatientsSearchComponent', () => {
  let component: HcPatientsSearchComponent;
  let fixture: ComponentFixture<HcPatientsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcPatientsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcPatientsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
