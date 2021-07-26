import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationEmailsComponent } from './configuration-emails.component';

describe('ConfigurationEmailsComponent', () => {
  let component: ConfigurationEmailsComponent;
  let fixture: ComponentFixture<ConfigurationEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationEmailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
