import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-passport-form',
  templateUrl: './new-passport-form.component.html',
  styleUrls: ['./new-passport-form.component.scss'],
})
export class NewPassportFormComponent {
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
