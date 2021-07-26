import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymastersCodesComponent } from './policymasters-codes.component';

describe('PolicymastersCodesComponent', () => {
  let component: PolicymastersCodesComponent;
  let fixture: ComponentFixture<PolicymastersCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicymastersCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymastersCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
