import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/store/reducers/auth.reducer';
import { AuthService } from '../data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store$: Store<AuthState>,
    private authService: AuthService
  ) {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      //this.store$.dispatch(new AuthSetAction(this.validateForm.value))
      this.authService.login(this.validateForm.value);
      console.log('submit', this.validateForm.value);
      // console.log(this.authService.getProfileData())
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false, Validators.requiredTrue],
    });
  }
}
