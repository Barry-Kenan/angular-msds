/**
 * Конструктор формы
 * @param Validators Валидаторы
 * @returns объект элементов формы
 */
export const fullPassportFormConstructor = (Validators: any): any => ({
  startDate: [null],
  endDate: [null],
  workDate: [null],
  passportNumber: [null],
  names: [null, [Validators.required]],
  tradeNames: [null],
  chemistryNames: [null],
  synonym: [null],
  normativeDocTypeId: [null],
  normativeDocCode: [null],
  okpd2CodeId: [null],
  tnVedCodeId: [null],
  mediatorId: [{ value: null, disabled: true }],
  organizationId: [{ value: null, disabled: true }],
  expert: [null],
  paymentMethod: [null],
  passportPeriod: [null],
  documentArrivalDate: [{ value: null, disabled: true }],
  nextRevisionDate: [null],
  payDay: [null],
  singleOrMultiple: [{ value: null, disabled: true }],
  danger: [null],
  signalWord: [null],
  accepted: [false],
  decline: [false],
  suspend: [false],
  reRegistration: [false],
  reRegistrationNumber: [null],
  enterpriseTypes: [null],
});
