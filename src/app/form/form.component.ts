import { Component } from '@angular/core';


// новый ПБ  *//
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  public date = null;
  public selectedZ = null;
  public selectedP = null;
  public selectedR = null;
  public checked = true;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
