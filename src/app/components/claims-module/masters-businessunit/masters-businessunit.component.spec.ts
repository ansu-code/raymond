import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersBusinessunitComponent } from './masters-businessunit.component';

describe('MastersBusinessunitComponent', () => {
  let component: MastersBusinessunitComponent;
  let fixture: ComponentFixture<MastersBusinessunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersBusinessunitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersBusinessunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
