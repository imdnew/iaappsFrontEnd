import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifstrategiqueFormComponent } from './objectifstrategique-form.component';

describe('StatFormComponent', () => {
  let component: ObjectifstrategiqueFormComponent;
  let fixture: ComponentFixture<ObjectifstrategiqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifstrategiqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifstrategiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
