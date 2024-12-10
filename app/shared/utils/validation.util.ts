export class ValidationUtil {
  static isValidBoatLength(length: number): boolean {
    return length > 0 && length < 200;
  }

  static isValidYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return year > 1900 && year <= currentYear;
  }
}