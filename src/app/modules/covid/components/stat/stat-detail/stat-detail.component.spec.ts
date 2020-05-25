import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDetailComponent } from './stat-detail.component';

describe('StatDetailComponent', () => {
  let component: StatDetailComponent;
  let fixture: ComponentFixture<StatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
