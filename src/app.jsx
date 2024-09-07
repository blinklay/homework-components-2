import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  // Можно задать 2 состояния — steps и activeIndex
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
  const toNextStep = () => {
    setActiveIndex((prev) => prev + 1);
  };
  const toBackStep = () => {
    setActiveIndex((prev) => prev - 1);
  };
  const resetSteps = () => {
    setActiveIndex(0);
  };

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
  let isLastStep = activeIndex === data.length - 1;
  let isFirstStep = activeIndex === 0;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={
                  styles["steps-item"] +
                  ` ${activeIndex >= index ? styles.done : ""}` +
                  ` ${activeIndex === index ? styles.active : ""}`
                }
              >
                {/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
                <button
                  onClick={() => setActiveIndex(index)}
                  className={styles["steps-item-button"]}
                >
                  {index + 1}
                </button>
                {/* При клике на кнопку установка выбранного шага в качестве активного */}
                {step.title}
              </li>
            ))}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={toBackStep}
              className={styles.button}
              disabled={isFirstStep}
            >
              Назад
            </button>
            <button
              className={styles.button}
              onClick={isLastStep ? resetSteps : toNextStep}
            >
              {isLastStep ? "Сначала" : "Далее"}
              {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
              {/* Или заменять всю кнопку в зависимости от условия */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
