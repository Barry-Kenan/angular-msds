/**
 * тип формы логина
 */
export interface User {
  /**
   * Логин
   */
  userName: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Запомнить
   */
  remember: boolean;
}
