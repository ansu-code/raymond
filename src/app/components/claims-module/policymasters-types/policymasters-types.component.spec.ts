import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymastersTypesComponent } from './policymasters-types.component';

describe('PolicymastersTypesComponent', () => {
  let component: PolicymastersTypesComponent;
  let fixture: ComponentFixture<PolicymastersTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicymastersTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymastersTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
