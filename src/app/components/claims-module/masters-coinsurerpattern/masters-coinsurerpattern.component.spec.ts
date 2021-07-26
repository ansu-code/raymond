import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersCoinsurerpatternComponent } from './masters-coinsurerpattern.component';

describe('MastersCoinsurerpatternComponent', () => {
  let component: MastersCoinsurerpatternComponent;
  let fixture: ComponentFixture<MastersCoinsurerpatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersCoinsurerpatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersCoinsurerpatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
