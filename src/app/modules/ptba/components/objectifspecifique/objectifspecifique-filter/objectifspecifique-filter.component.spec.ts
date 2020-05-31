import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifspecifiqueFilterComponent } from './objectifspecifique-filter.component';

describe('StatFilterComponent', () => {
  let component: ObjectifspecifiqueFilterComponent;
  let fixture: ComponentFixture<ObjectifspecifiqueFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifspecifiqueFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifspecifiqueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
