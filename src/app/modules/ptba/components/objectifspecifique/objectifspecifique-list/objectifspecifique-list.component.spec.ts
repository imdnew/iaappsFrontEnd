import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifspecifiqueListComponent } from './objectifspecifique-list.component';

describe('StatListComponent', () => {
  let component: ObjectifspecifiqueListComponent;
  let fixture: ComponentFixture<ObjectifspecifiqueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifspecifiqueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifspecifiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
