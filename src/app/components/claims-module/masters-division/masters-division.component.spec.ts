import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersDivisionComponent } from './masters-division.component';

describe('MastersDivisionComponent', () => {
  let component: MastersDivisionComponent;
  let fixture: ComponentFixture<MastersDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
