import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEquipamentsComponent } from './dash-equipaments.component';

describe('DashEquipamentsComponent', () => {
  let component: DashEquipamentsComponent;
  let fixture: ComponentFixture<DashEquipamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashEquipamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEquipamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
