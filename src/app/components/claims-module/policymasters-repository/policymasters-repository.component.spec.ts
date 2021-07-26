import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymastersRepositoryComponent } from './policymasters-repository.component';

describe('PolicymastersRepositoryComponent', () => {
  let component: PolicymastersRepositoryComponent;
  let fixture: ComponentFixture<PolicymastersRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicymastersRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymastersRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
