import React from "react";
import classes from "./AboutComponent.module.css";

const AboutComponent = () => {
  return (
    <main className={classes.aboutWrap}>
      <h1>Про компанію</h1>
      <div className={classes.columnWrapper}>
        <div className={classes.leftColumn}>
          <h2>
            Команда <span>ENERGY SOLAR</span> разом з вами на хвилі
            енергоефективності.
          </h2>
          <p>
            Разом ми створюємо зелене майбутнє для нашої планети. Долучайтесь до
            нас сьогодні і зробіть крок до енергетичної незалежності
          </p>
        </div>
        <div className={classes.rightColumn}>
          <img src="/AboutPhoto.webp" loading="lazy" alt="EnergySolarPhoto" />
        </div>
      </div>
      <div className={classes.statisticWrapper}>
        <div className={classes.leftStatisticBlock}>
          <span>100+</span>
          <p>Постійних клієнтів</p>
        </div>
        <div className={classes.leftStatisticBlock}>
          <span>90%</span>
          <p>Клієнтів повертаються до нас</p>
        </div>
        <div className={classes.rightStatisticBlock}>
          <span>500+</span>
          <p>Позитивних відгуків</p>
        </div>
        <div className={classes.rightStatisticBlock}>
          <span>3</span>
          <p>Роки постійної роботи</p>
        </div>
      </div>

      <div className={classes.whyUsWrapper}>
        <h2>Чому Саме Ми?</h2>
        <div className={classes.whyUsInfo}>
          <div className={classes.whyBlock}>
            <span>Надійність та Якість</span>
            <p>
              На команду Energy Solar можна покластися. Ми пропонуємо лише
              продукцію від провідних виробників з відомою репутацією у галузі
              альтернативної енергетики. Наші сонячні панелі та комплектуючі -
              це гарантія надійності та довговічності.
            </p>
          </div>
          <div className={classes.whyBlock}>
            <span>Екологічне Мислення</span>
            <p>
              У Energy Solar ми присвячені збереженню природних ресурсів та
              зменшенню викидів. Використання сонячних панелей допомагає
              зменшити вуглецевий слід та сприяє створенню чистішого
              навколишнього середовища для наших нащадків.
            </p>
          </div>
          <div className={classes.whyBlock}>
            <span>Економічна Вигода</span>
            <p>
              Інвестиція у сонячні панелі - це інвестиція у майбутнє. Зниження
              витрат на електроенергію та можливість продажу надлишкової енергії
              дозволяє вам економити гроші та отримувати прибуток у
              довгостроковій перспективі.
            </p>
          </div>
          <div className={classes.whyBlock}>
            <span>Підтримка та Супровід</span>
            <p>
              Energy Solar не лише надає найкращі технології, але й гарантує
              високий рівень обслуговування. Наші фахівці з радістю нададуть
              консультації щодо вибору, монтажу та підтримки сонячної
              енергетичної системи.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutComponent;
