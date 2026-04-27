// src/components/pages/MbiEntryPage.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import IntroScreen from "../Screens/IntroScreen";
import FormScreen from "../Screens/FormScreen";
import QuestionsScreen from "../Screens/QuestionsScreen";
import { MbiDataContext } from "../../context/MbiDataContext";

function normalizeAnswers(ans, n) {
  if (!Array.isArray(ans)) return Array(n).fill(0);
  if (ans.length > n) return ans.slice(0, n);
  if (ans.length < n) return ans.concat(Array(n - ans.length).fill(0));
  return ans;
}

//	Основной компонент страницы теста
const MbiEntryPage = () => {
  const { questions, answerOptions, loading: mbiLoading } = useContext(MbiDataContext);
  // Состояния компонента
  const [step, setStep] = useState("intro");
  const [userData, setUserData] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [error, setError] = useState("");
  const [timeDisplay, setTimeDisplay] = useState("");

  // Функция отправки результатов на сервер и обработка ответа
  function sendResults({ userData, answerIndices, date }) {
    setError("");
    setResultId(null);

    const { hostname } = window.location;
    const isGitHubPages = hostname === "github.io" || hostname.endsWith(".github.io");

    // Выравниваем массив ответов под количество вопросов!
    const normalizedIndices = normalizeAnswers(answerIndices, questions.length);

    if (isGitHubPages) {
      // Сохраняем результат в localStorage (для github-pages)
      const fakeId = "test-" + Math.floor(Math.random() * 100000);
      localStorage.setItem(
        `test-result-${fakeId}`,
        JSON.stringify({ user: userData, answerIndices: normalizedIndices, date })
      );
      setResultId(fakeId);
      setStep("resultLink");
      return;
    }

    // На localhost/127.0.0.1 отправляем на сервер
    fetch("/api/mbi-test/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userData, answerIndices: normalizedIndices, date })
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Ошибка сервера");
        const data = await res.json();
        if (!data.id) throw new Error("Не получен ID результата");

        localStorage.setItem(
          `test-result-${data.id}`,
          JSON.stringify({ user: userData, answerIndices: normalizedIndices, date })
        );

        setResultId(data.id);
        setStep("resultLink");
      })
      .catch((err) => {
        setError(err.message || "Ошибка отправки");
        setStep("resultLink");
      });
  }

  // --------- UI шагов ---------
  if (mbiLoading) return <div>Загрузка теста…</div>;
  if (!questions || !Array.isArray(questions)) {
    return <div>Ошибка загрузки вопросов</div>;
  }

  if (step === "intro") {
    return (
      <IntroScreen onStart={() => setStep("form")} />
    );
  }

  if (step === "form") {
    return (
      <FormScreen
        onSubmit={(formData) => {
          setUserData(formData);
          setTimeDisplay(new Date().toLocaleDateString("ru-RU"));
          setStep("questions");
        }}
        onBack={() => setStep("intro")}
      />
    );
  }

  if (step === "questions") {
    return (
      <QuestionsScreen
        showTestFillButton
        userData={userData}
        timeDisplay={timeDisplay}
        answerOptions={answerOptions}
        questions={questions}
        // По завершении — вызывать sendResults!
        onComplete={({ answerIndices }) => {
          setStep("loading");
          sendResults({ userData, answerIndices, date: timeDisplay });
        }}
        onBack={() => setStep("form")}
      />
    );
  }

  if (step === "loading") {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Сохраняем ваши результаты...</div>;
  }

  if (step === "resultLink") {
    if (error) {
      return (
        <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
          Ошибка при сохранении: {error}
          <br />
          <button onClick={() => setStep("questions")}>Попробовать ещё раз</button>
        </div>
      );
    }
    return (
      <div className="test-completed" style={{ textAlign: "center", marginTop: 40 }}>
        <div className="test-completed__container">
          <div className="test-completed__body">
            <h2 className="test-completed__title">Тест завершен! </h2>
            <h3 className="test-completed__subtitle">Спасибо за участие в тестировании.</h3>
            <p className="test-completed__text">Ваши результаты тестирования доступны по ссылке:</p>
            <Link className="button" to={`/mbi-result/${resultId}`}>
              Посмотреть результат
            </Link>
            <br />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MbiEntryPage;