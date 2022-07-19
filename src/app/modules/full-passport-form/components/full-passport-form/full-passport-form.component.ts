import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-passport-form',
  templateUrl: './full-passport-form.component.html',
  styleUrls: ['./full-passport-form.component.scss'],
})
export class FullPassportFormComponent implements OnInit {
  public fullPassportForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  public submitForm(): void {
    return this.fullPassportForm.value;
  }

  public resetForm(): void {
    this.fullPassportForm.reset();
  }

  public ngOnInit(): void {
    /**
     * валидация
     */
    this.fullPassportForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      passportNumber: [null],
      names: [null],
      tradeNames: [null],
      chemistryNames: [null],
      synonym: [null],
      normativeDocTypeId: [null],
      normativeDocCode: [null],
      okpd2CodeId: [null],
      tnVedCodeId: [null],
      mediatorId: [null],
      organizationId: [null],
      paymentMethod: [null],
      passportPeriod: [null],
      documentArrivalDate: [null],
      nextRevisionDate: [null],
      payDay: [null],

      datePicker: [null, [Validators.required]],
      note: [null],
      selectDeclarer: [null],
      remember: [null],
    });
  }
}
