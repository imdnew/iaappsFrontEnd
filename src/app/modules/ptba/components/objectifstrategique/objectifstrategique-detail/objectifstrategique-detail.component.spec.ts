import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifstrategiqueDetailComponent } from './objectifstrategique-detail.component';

describe('StatDetailComponent', () => {
  let component: ObjectifstrategiqueDetailComponent;
  let fixture: ComponentFixture<ObjectifstrategiqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifstrategiqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifstrategiqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
