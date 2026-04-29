// src/utils/mbiNorms.js
// Работа с чистыми функциями для обработки шкал и рекомендаций

// Поиск диапазонов по шкале и баллу
export function getLevelForScore(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale || !Array.isArray(scale.norms)) return "Нет данных";
  return scale.norms.find((r) => score >= r.min && score <= r.max)?.label || "Нет данных";
}


// Преобразовать русcкий текст уровня в ключ
export function getLevelKey(label) {
  const s = String(label || "").toLowerCase();
  if (s.includes("крайне низк")) return "veryLow";
  if (s.includes("низк")) return "low";
  if (s.includes("средн")) return "mid";
  if (s.includes("крайне высок")) return "veryHigh";
  if (s.includes("высок")) return "high";
  return "mid";
}

// Получить рекомендацию/интерпретацию уровня
export function getRecommendation(scales, scaleKey, score) {
  const scale = scales?.[scaleKey];
  if (!scale) return "";
  const label = getLevelForScore(scales, scaleKey, score);
  const key = getLevelKey(label);
  return scale?.interpretations?.[key] || "";
}

// Профиль "выгорания" по результатам
export function combinedInterpretation(scores) {
  let exhaustion, depersonalization, reduction;

  // Если массив — достаем по индексам (если порядок правильный)
  if (Array.isArray(scores)) {
    exhaustion = scores[0];
    depersonalization = scores[1];
    reduction = scores[2];
  } else if (scores && typeof scores === "object") {
    exhaustion = scores.exhaustion;
    depersonalization = scores.depersonalization;
    reduction = scores.reduction;
  }

  // Если что-то не определено — возвращаем пусто или какую-то заглушку
  if (typeof exhaustion !== "number" || typeof depersonalization !== "number" || typeof reduction !== "number") {
    return [];
  }

  const exhausted = exhaustion >= 31;
  const depersonal = depersonalization >= 18;
  const reduced = reduction <= 18; // обратная шкала: чем ниже, тем лучше

  const messages = [];

  if (exhausted && depersonal && reduced) {
    messages.push("По всем трём шкалам есть выраженные признаки выгорания: человек сильно истощён, эмоционально дистанцируется и чувствует снижение профессиональной эффективности.");
  } else {
    if (exhausted && depersonal) {
      messages.push("Сочетание высокого истощения и выраженной дистанции в общении говорит о том, что ресурсы уже сильно снижены, а взаимодействие с людьми даётся с трудом.");
    }
    if (exhausted && reduced) {
      messages.push("Сочетание высокого истощения и снижения ощущения профессиональной эффективности говорит о риске потери мотивации и уверенности в своей работе.");
    }
  }

  return messages;
}
