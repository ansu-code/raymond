import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymastersYearsComponent } from './policymasters-years.component';

describe('PolicymastersYearsComponent', () => {
  let component: PolicymastersYearsComponent;
  let fixture: ComponentFixture<PolicymastersYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicymastersYearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymastersYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
