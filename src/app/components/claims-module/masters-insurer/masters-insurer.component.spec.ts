import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersInsurerComponent } from './masters-insurer.component';

describe('MastersInsurerComponent', () => {
  let component: MastersInsurerComponent;
  let fixture: ComponentFixture<MastersInsurerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersInsurerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersInsurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
