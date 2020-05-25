import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteFormComponent } from './entite-form.component';

describe('StatFormComponent', () => {
  let component: EntiteFormComponent;
  let fixture: ComponentFixture<EntiteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
