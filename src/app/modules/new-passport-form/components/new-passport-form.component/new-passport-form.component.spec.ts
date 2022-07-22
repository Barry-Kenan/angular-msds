import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassportFormComponent } from './new-passport-form.component';

describe('NewPassportFormComponent', () => {
  let component: NewPassportFormComponent;
  let fixture: ComponentFixture<NewPassportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPassportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
