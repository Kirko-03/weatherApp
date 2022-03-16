import cd from "./CardDay.module.css";

export const CardDay = ({ day, lang }) => {
  const ms = day.dt * 1000;
  const weekdayName = new Date(ms).toLocaleString(lang, { weekday: "long" });

  const imgURL = `https://openweathermap.org/img/wn/${day.weather[0]["icon"]}@2x.png`;
  console.log(imgURL);

  return (
    <div className={cd.Card}>
      <div className={cd.day}>{weekdayName}</div>
      <span>
        {(day.dt_txt.includes("12:00:00") && "12:00:00") ||
          (day.dt_txt.includes("00:00:00") && "00:00:00")}
      </span>
      <img src={imgURL} />
      <div className={cd.temp}>{Math.floor(day.main.temp)}°C</div>
      <div className={cd.description}>{day.weather[0].description}</div>
    </div>
  );
};
