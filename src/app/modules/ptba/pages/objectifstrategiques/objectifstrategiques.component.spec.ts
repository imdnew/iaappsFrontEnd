import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifstrategiquesComponent } from './objectifstrategiques.component';

describe('StatsComponent', () => {
  let component: ObjectifstrategiquesComponent;
  let fixture: ComponentFixture<ObjectifstrategiquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifstrategiquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifstrategiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
