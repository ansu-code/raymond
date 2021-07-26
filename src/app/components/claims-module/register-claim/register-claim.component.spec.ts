import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClaimComponent } from './register-claim.component';

describe('RegisterClaimComponent', () => {
  let component: RegisterClaimComponent;
  let fixture: ComponentFixture<RegisterClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
