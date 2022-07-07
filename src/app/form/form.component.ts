import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// новый ПБ  *//
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  newPassportForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.newPassportForm.reset();
  }

  submitForm(): void {
    console.log(this.newPassportForm.value);
  }

  ngOnInit(): void {
    this.newPassportForm = this.fb.group({
      // userName: [null, [Validators.required]],
      // password: [null, [Validators.required]],
      // remember: [false],
    });
  }
}
