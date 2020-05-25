import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmFilterComponent } from './vm-filter.component';

describe('VmFilterComponent', () => {
  let component: VmFilterComponent;
  let fixture: ComponentFixture<VmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
