import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymastersNumbersComponent } from './policymasters-numbers.component';

describe('PolicymastersNumbersComponent', () => {
  let component: PolicymastersNumbersComponent;
  let fixture: ComponentFixture<PolicymastersNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicymastersNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymastersNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
