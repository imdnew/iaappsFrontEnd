import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteDetailComponent } from './entite-detail.component';

describe('StatDetailComponent', () => {
  let component: EntiteDetailComponent;
  let fixture: ComponentFixture<EntiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
