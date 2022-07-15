import { Organization } from './organization';

/**
 * тип списка ПБ
 */

export interface ListPassport {
  serialNumber: number; // Порядковый номер в таблице
  documentArrivalDate: string; // Дата поступления документов
  endDate: string; // Действителен до
  id: string; // id
  names: string; // Наименование
  okpd2Code: string; // Код ОКПД 2
  organization: [Organization]; // Заявитель
  passportNumber: number; // Номер ПБ
  mediator: string; // Посредник
  expert: string; // Эксперт
  startDate: string; // Действителен от
  tnVedCode: string; // Код ТН ВЭД ЕАЭС
  workDate: string; // Дата выполнения работ
  decline: boolean; //
  accepted: boolean; //
  createUserId: string; //
  status: string; // Статус
}
