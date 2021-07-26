import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesauthorizationComponent } from './users-rolesauthorization.component';

describe('UsersRolesauthorizationComponent', () => {
  let component: UsersRolesauthorizationComponent;
  let fixture: ComponentFixture<UsersRolesauthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRolesauthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesauthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
