import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPassportFormComponent } from './full-passport-form.component';

describe('FullPassportFormComponent', () => {
  let component: FullPassportFormComponent;
  let fixture: ComponentFixture<FullPassportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPassportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPassportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
