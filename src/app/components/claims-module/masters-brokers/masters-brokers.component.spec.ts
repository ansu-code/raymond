import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersBrokersComponent } from './masters-brokers.component';

describe('MastersBrokersComponent', () => {
  let component: MastersBrokersComponent;
  let fixture: ComponentFixture<MastersBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersBrokersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
