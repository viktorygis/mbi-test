import React, { useMemo, useCallback, useState } from 'react';

const LS_KEY = 'mbi_show_debug_table'; // "true" | "false"

const thStyle = {
  padding: '8px 12px',
  textAlign: 'center',
  borderBottom: '2px solid #d1d5db',
  fontWeight: 600,
};

const tdStyle = {
  padding: '6px 12px',
  textAlign: 'center',
};

export default function ResultsAnswersDebugTable({
  enabled = true,          // общий рубильник (если false — компонент ничего не рендерит)
  questions = [],
  answerIndices = [],
  answerOptions = [],
  mbiResults = null,
}) {
  // Показ/скрытие таблицы — кнопкой + localStorage true/false
  const [showDebugTable, setShowDebugTable] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') {
      localStorage.setItem(LS_KEY, 'true');
      return true;
    }
    return localStorage.getItem(LS_KEY) === 'true';
  });

  const toggleDebugTable = useCallback(() => {
    setShowDebugTable((prev) => {
      const next = !prev;
      localStorage.setItem(LS_KEY, String(next)); // "true" | "false"
      return next;
    });
  }, []);

  // карта question.id -> шкала
  const questionScaleMap = useMemo(() => {
    if (!mbiResults?.scales) return {};
    const map = {};
    const { exhaustion, depersonalization, reduction } = mbiResults.scales;
    exhaustion?.items?.forEach((id) => { map[id] = exhaustion.title; });
    depersonalization?.items?.forEach((id) => { map[id] = depersonalization.title; });
    reduction?.items?.forEach((id) => { map[id] = reduction.title; });
    return map;
  }, [mbiResults]);

  // получить индекс по массиву (по порядку) или по объекту (по id)
  const getAnswerIndexForQuestion = useCallback(
    (q, i) => {
      if (!q) return undefined;

      if (Array.isArray(answerIndices)) return answerIndices[i];

      if (answerIndices && typeof answerIndices === 'object') {
        const byId = answerIndices[q.id];
        if (byId !== undefined) return byId;

        const byStringId = answerIndices[String(q.id)];
        if (byStringId !== undefined) return byStringId;
      }

      return undefined;
    },
    [answerIndices]
  );

  const debugWarnings = useMemo(() => {
    const warnings = [];
    if (Array.isArray(answerIndices) && questions?.length) {
      if (answerIndices.length !== questions.length) {
        warnings.push(
          `Длина answerIndices (${answerIndices.length}) не равна количеству questions (${questions.length}).`
        );
      }
    }
    return warnings;
  }, [answerIndices, questions]);

  if (!enabled) return null;

  return (
    <div style={{ margin: '16px auto', maxWidth: 900 }}>
      {/* Кнопка включить/выключить таблицу */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <button className="patterns-button" type="button" onClick={toggleDebugTable}>
          {showDebugTable ? 'Скрыть таблицу ответов' : 'Показать таблицу ответов'}
        </button>
      </div>

      {showDebugTable && questions.length > 0 && (
        <div style={{ margin: '0 auto', maxWidth: 900, overflowX: 'auto' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 12 }}>Отладка: выбранные ответы</h3>

          {debugWarnings.length > 0 && (
            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                padding: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Предупреждения:</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {debugWarnings.map((w, idx) => (
                  <li key={idx} style={{ fontSize: 13 }}>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={thStyle}>№</th>
                <th style={thStyle}>Вопрос</th>
                <th style={thStyle}>Ответ (метка)</th>
                <th style={thStyle}>Индекс (0..5)</th>
                <th style={thStyle}>Шкала MBI</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, i) => {
                const idx = getAnswerIndexForQuestion(q, i);
                const label =
                  idx !== undefined && idx !== null && answerOptions[idx] !== undefined
                    ? answerOptions[idx]
                    : '—';

                const scale = questionScaleMap[q.id] ?? '—';

                const isValid =
                  idx !== undefined &&
                  idx !== null &&
                  Number.isInteger(idx) &&
                  idx >= 0 &&
                  idx < answerOptions.length;

                return (
                  <tr
                    key={q.id ?? i}
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      background: isValid ? undefined : '#fef2f2',
                    }}
                  >
                    <td style={tdStyle}>{q.id ?? i + 1}</td>
                    <td style={{ ...tdStyle, textAlign: 'left' }}>{q.text}</td>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdStyle}>{idx ?? '—'}</td>
                    <td style={tdStyle}>{scale}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}