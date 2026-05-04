// src/utils/pdf/pdfHelpers.js

/**
 * Форматирует дату для отображения в шапке PDF: дд.мм.гггг
 */
export function formatDateDisplay(raw) {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

/**
 * Форматирует дату для имени файла: дд-мм-гггг
 * Если строка уже в формате дд-мм-гггг — возвращает как есть
 */
export function formatDateFile(raw) {
  if (!raw) return "";
  if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

/**
 * Возвращает фамилию (первое слово) из полного имени
 */
export function getLastName(fullName) {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0];
}