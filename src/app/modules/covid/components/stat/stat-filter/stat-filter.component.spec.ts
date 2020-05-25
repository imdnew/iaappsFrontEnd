import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatFilterComponent } from './stat-filter.component';

describe('StatFilterComponent', () => {
  let component: StatFilterComponent;
  let fixture: ComponentFixture<StatFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
