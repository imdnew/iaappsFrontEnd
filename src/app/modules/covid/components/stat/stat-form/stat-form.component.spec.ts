import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatFormComponent } from './stat-form.component';

describe('StatFormComponent', () => {
  let component: StatFormComponent;
  let fixture: ComponentFixture<StatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
