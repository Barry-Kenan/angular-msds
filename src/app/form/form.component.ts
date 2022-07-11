import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// новый ПБ  *//
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public newPassportForm!: FormGroup;

  public check = false;

  constructor(private fb: FormBuilder) {}

  public checked(e: boolean) {
    this.check = e;
  }

  public submitForm(): void {
    console.log(this.newPassportForm.value);
  }

  public resetForm(): void {
    this.newPassportForm.reset();
  }

  public ngOnInit(): void {
    this.newPassportForm = this.fb.group({
      datePicker: [null, [Validators.required]],
      note: [null],
      selectDeclarer: [null],
      checkbox: [false],
      selectIntermediary: [null],
      selectRegularity: [null],
    });
  }
}
