/**
 * тип формы логина
 */
export interface User {
  /**
   * Логин
   */
  login: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Запомнить
   */
  remember: boolean;
}
