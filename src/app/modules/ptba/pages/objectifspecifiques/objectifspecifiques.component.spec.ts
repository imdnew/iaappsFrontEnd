import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifspecifiquesComponent } from './objectifspecifiques.component';

describe('StatsComponent', () => {
  let component: ObjectifspecifiquesComponent;
  let fixture: ComponentFixture<ObjectifspecifiquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifspecifiquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifspecifiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
