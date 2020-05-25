import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifstrategiqueListComponent } from './objectifstrategique-list.component';

describe('StatListComponent', () => {
  let component: ObjectifstrategiqueListComponent;
  let fixture: ComponentFixture<ObjectifstrategiqueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifstrategiqueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifstrategiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
