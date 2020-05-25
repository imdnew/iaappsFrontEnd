import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteFilterComponent } from './entite-filter.component';

describe('StatFilterComponent', () => {
  let component: EntiteFilterComponent;
  let fixture: ComponentFixture<EntiteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
