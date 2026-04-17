// MbiEntryPage - Главная страница теста MBI: интро, форма, вопросы, переход к результату

import React, { useState } from "react";
import { Link } from "react-router-dom";
import IntroScreen from "../Screens/IntroScreen";
//	FormScreen - экран с формой для ввода данных пользователя
import FormScreen from "../Screens/FormScreen";
//	QuestionsScreen - экран с вопросами теста
import QuestionsScreen from "../Screens/QuestionsScreen";


//	Основной компонент страницы теста
const MbiEntryPage = () => {
  //	Состояния компонента (шаг, данные пользователя, индексы ответов, id результата, ошибка, отображаемое время)
  const [step, setStep] = useState("intro");
  const [userData, setUserData] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [error, setError] = useState("");
  //	Отображаемое время вверху экрана вопросов
  const [timeDisplay, setTimeDisplay] = useState("");

  //	Рендеринг в зависимости от шага
  //	Шаги: intro, form, questions, loading, resultLink

  //	Если intro - показываем интро. intro - начальный шаг
  if (step === "intro") {
    return (
      <IntroScreen onStart={() => setStep("form")} />
    );
  }

  //	Если form - показываем форму для ввода данных пользователя
  if (step === "form") {
    return (
      /* FormScreen - экран с формой для ввода данных пользователя */
      <FormScreen
        //	Функция обратного вызова при отправке формы
        onSubmit={(formData) => {
          //	Сохраняем данные пользователя и переходим к вопросам
          setUserData(formData);
          //	Устанавливаем отображаемое время в формате "дд.мм.гггг"
          setTimeDisplay(new Date().toLocaleDateString("ru-RU"));
          //	Переходим к вопросам
          setStep("questions");
        }}
        //	Функция обратного вызова при нажатии кнопки "Назад"
        onBack={() => setStep("intro")}
      />
    );
  }

  //	Если questions - показываем вопросы теста
  if (step === "questions") {
    return (
      /* QuestionsScreen - экран с вопросами теста MBI */
      <QuestionsScreen
        //Показывать кнопку для заполнения теста
        showTestFillButton={true}
        //Данные пользователя
        userData={userData}
        //Дата и время отображаемые вверху
        timeDisplay={timeDisplay}
        //Функция обратного вызова при завершении теста: получаем answerIndices
        onComplete={({ answerIndices }) => {
          //	Переходим к следующему шагу
          setStep("loading");
          //	Отправляем результаты на сервер
          sendResults({ userData, answerIndices, date: timeDisplay });
        }}
        //Функция обратного вызова при нажатии кнопки "Назад"
        onBack={() => setStep("form")}
      />
    );
  }

  //	Если loading - показываем загрузку (сохранение результатов)
  if (step === "loading") {
    //	Здесь можно добавить анимацию загрузки
    return <div style={{ textAlign: "center", marginTop: 40 }}>Сохраняем ваши результаты...</div>;
  }

  //	Если resultLink - показываем ссылку на результат или ошибку при сохранении
  if (step === "resultLink") {
    //	Если была ошибка при сохранении, показываем сообщение об ошибке и кнопку "Попробовать ещё раз"
    if (error) {
      return (
        /* Ошибка при сохранении */
        <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
          Ошибка при сохранении: {error}
          <br />
          <button onClick={() => setStep("questions")}>Попробовать ещё раз</button>
        </div>
      );
    }
    //	Если результат успешно сохранён, показываем ссылку на результат
    return (
      <div className="test-completed" style={{ textAlign: "center", marginTop: 40 }}>
        <div className="test-completed__container">
          <div className="test-completed__body">
            <h2 className="test-completed__title">Тест завершен! </h2>
            <h3 className="test-completed__subtitle">Спасибо за участие в тестировании.</h3>
            <p className="test-completed__text">Ваши результаты тестирования доступны по ссылке:</p>
            <Link className="button"
              to={`/mbi-result/${resultId}`}
            >
              Посмотреть результат
            </Link>
            <br />
          </div>
        </div>
      </div>
    );
  }

  // ------- UTILS -------
  //	Функция отправки результатов на сервер и обработка ответа
  function sendResults({ userData, answerIndices, date }) {
    setError("");
    setResultId(null);

    // true, если на prod (github-pages), где сервера нет!
    const { hostname } = window.location;
    const isGitHubPages =
      hostname === "github.io" || hostname.endsWith(".github.io");

    if (isGitHubPages) {
      // Фейковый ID, данные в localStorage
      const fakeId = "test-" + Math.floor(Math.random() * 100000);
      localStorage.setItem(
        `test-result-${fakeId}`,
        JSON.stringify({ user: userData, answerIndices, date })
      );
      setResultId(fakeId);
      setStep("resultLink");
      return;
    }

    // На localhost/127.0.0.1 всегда используем сервер! 👇
    fetch("/api/test-mbi/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userData, answerIndices, date })
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Ошибка сервера");
        const data = await res.json();
        if (!data.id) throw new Error("Не получен ID результата");

        localStorage.setItem(
          `test-result-${data.id}`,
          JSON.stringify({ user: userData, answerIndices, date })
        );

        setResultId(data.id);
        setStep("resultLink");
      })
      .catch((err) => {
        setError(err.message || "Ошибка отправки");
        setStep("resultLink");
      });
  }


  //	Если ни один шаг не совпал, возвращаем null
  return null;
};

export default MbiEntryPage;
