import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcMastheadAComponent } from './hc-masthead-a.component';

describe('HcMastheadAComponent', () => {
  let component: HcMastheadAComponent;
  let fixture: ComponentFixture<HcMastheadAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcMastheadAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcMastheadAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
