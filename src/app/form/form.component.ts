import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// новый ПБ  *//
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public newPassportForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public resetForm(): void {
    this.newPassportForm.reset();
  }

  public submitForm(): void {
    return this.newPassportForm.value;
  }
}
