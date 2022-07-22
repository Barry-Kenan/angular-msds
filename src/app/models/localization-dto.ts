/**
 * Транспортный объект для передачи наименований бизнес-объектов, чувствительных к языку.
 */
export interface LocalizationDto {
  /**
   * Строка на указанном языке
   */
  value: string;
  /**
   * Код языка
   */
  lang: string;
}
