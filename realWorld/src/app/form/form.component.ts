import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  date = null;
  selectedZ = null;
  selectedP = null;
  selectedR = null;
  checked = true;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
