import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FullPassportService } from '../../services/full-passport-form.service/full-passport-form.service';

@Component({
  selector: 'app-full-passport-form',
  templateUrl: './full-passport-form.component.html',
  styleUrls: ['./full-passport-form.component.scss'],
})
export class FullPassportFormComponent implements OnInit {
  public fullPassportForm!: FormGroup;

  public data: any;

  constructor(private fb: FormBuilder, private router: Router, public fullPassportService: FullPassportService) {}

  public submitForm(): void {
    return this.fullPassportForm.value;
  }

  public resetForm(): void {
    this.fullPassportForm.reset();
  }

  public ngOnInit(): void {
    this.data = this.fullPassportService.data;
    // eslint-disable-next-line no-debugger
    debugger;
    /**
     * Конструктор формы
     */
    this.fullPassportForm = this.fb.group({
      startDate: [this.data.startDate],
      endDate: [this.data.endDate],
      passportNumber: [null],
      names: [],
      tradeNames: [this.data.names],
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
