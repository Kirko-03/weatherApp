import { useEffect, useState } from "react";
import { CardDay } from "./CardDay";
import fd from "./FiveDays.module.css";
export const FiveDays = () => {
  let [place, setPlace] = useState("Bryansk");
  let [input, setInput] = useState("Bryansk");
  let [city, setCity] = useState("");
  let lang = ["ru", "de", "en"];
  let [error, setError] = useState(null);
  let [activeLang, setActiveLang] = useState(0);
  let [currentWeather, setCurrentWeather] = useState({ days: [] });
  function checkLang(ru, en, de) {
    return (
      (lang[activeLang] === "de" && de) ||
      (lang[activeLang] === "en" && en) ||
      ru
    );
  }
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&lang=${lang[activeLang]}&units=metric&APPID=1eec2ec50e7ee63f95ab7b35df822830`
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        console.log(data);
        setCity(data.city.name);
        console.log(city);
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        const nightData = data.list.filter((reading) =>
          reading.dt_txt.includes("00:00:00")
        );
        setCurrentWeather({ days: [...nightData, ...dailyData] });
        console.log(data);
        console.log(dailyData);
        setError(null);
      })
      .catch((e) => {
        setError("Такой город не найден");
      });
  }, [activeLang, place]);
  console.log(currentWeather);
  return (
    <div>
      <div className={fd.header}>
        <h1>
          {checkLang(
            "Прогноз погоды на 5 дней",
            "5 day weather forecast",
            "5-Tage Wettervorhersage"
          )}
        </h1>
      </div>
      <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
      <button
        onClick={() => {
          setPlace(input);
        }}
      >
        {checkLang("Отправить", "Send", "Schicken")}
      </button>
      {lang.map((el, index) => (
        <button key={index} onClick={() => setActiveLang(index)}>
          {el}
        </button>
      ))}

      {!error ? (
        <div>
          <h2>{city}</h2>
          <div className={fd.Cards}>
            {currentWeather.days.map((day) => (
              <CardDay day={day} lang={lang[activeLang]} />
            ))}
          </div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
