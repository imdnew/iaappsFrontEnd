import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteListComponent } from './entite-list.component';

describe('StatListComponent', () => {
  let component: EntiteListComponent;
  let fixture: ComponentFixture<EntiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
