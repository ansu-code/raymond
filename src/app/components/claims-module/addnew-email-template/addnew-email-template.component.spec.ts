import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewEmailTemplateComponent } from './addnew-email-template.component';

describe('AddnewEmailTemplateComponent', () => {
  let component: AddnewEmailTemplateComponent;
  let fixture: ComponentFixture<AddnewEmailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewEmailTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
