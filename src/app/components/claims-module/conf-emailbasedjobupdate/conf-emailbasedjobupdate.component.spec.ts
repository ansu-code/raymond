import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfEmailbasedjobupdateComponent } from './conf-emailbasedjobupdate.component';

describe('ConfEmailbasedjobupdateComponent', () => {
  let component: ConfEmailbasedjobupdateComponent;
  let fixture: ComponentFixture<ConfEmailbasedjobupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfEmailbasedjobupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfEmailbasedjobupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
