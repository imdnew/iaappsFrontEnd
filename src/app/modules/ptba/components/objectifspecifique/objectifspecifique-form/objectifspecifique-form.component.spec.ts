import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifspecifiqueFormComponent } from './objectifspecifique-form.component';

describe('StatFormComponent', () => {
  let component: ObjectifspecifiqueFormComponent;
  let fixture: ComponentFixture<ObjectifspecifiqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifspecifiqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifspecifiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
