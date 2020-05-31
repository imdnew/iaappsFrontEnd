import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifspecifiqueDetailComponent } from './objectifspecifique-detail.component';

describe('StatDetailComponent', () => {
  let component: ObjectifspecifiqueDetailComponent;
  let fixture: ComponentFixture<ObjectifspecifiqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifspecifiqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifspecifiqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
