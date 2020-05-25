import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifstrategiqueFilterComponent } from './objectifstrategique-filter.component';

describe('StatFilterComponent', () => {
  let component: ObjectifstrategiqueFilterComponent;
  let fixture: ComponentFixture<ObjectifstrategiqueFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifstrategiqueFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifstrategiqueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
