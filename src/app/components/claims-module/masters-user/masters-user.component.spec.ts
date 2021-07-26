import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersUserComponent } from './masters-user.component';

describe('MastersUserComponent', () => {
  let component: MastersUserComponent;
  let fixture: ComponentFixture<MastersUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
