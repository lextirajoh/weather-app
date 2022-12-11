import flipcard from '../assets/turn2.png';
import openweather from '../assets/openweather.png';

export default function CardBack({
  data,
  cityNameEN,
  cityNameNL,
  countryName,
}) {
  const d = new Date();
  const userOffset = d.getTimezoneOffset() * 60;

  function dayConverter(unix_timestamp) {
    const weekdays = [
      'Zondag',
      'Maandag',
      'Dinsdag',
      'Woensdag',
      'Donderdag',
      'Vrijdag',
      'Zaterdag',
    ];

    const d = new Date(
      (unix_timestamp + userOffset + data.timezone_offset) * 1000
    );
    const day = weekdays[d.getDay()];
    return day;
  }

  return (
    <div className="card__back">
      <main>
        <img src={flipcard} alt="Flip card" className="flip" />
        <header>
          {cityNameNL ? (
            <span className="city">{cityNameNL}</span>
          ) : (
            <span className="city">{cityNameEN}</span>
          )}
          <span className="country">
            <sup>{countryName}</sup>
          </span>
        </header>

        <div className="komende-week">
          <p>KOMENDE WEEK</p>
          <div className="line-back" />
        </div>

        {data.daily.slice(0, 7).map((daily, index) => {
          return (
            <article key={index} className="week-forecast">
              <div className="grid-a">
                {index === 0 ? <p>Vandaag</p> : <p>{dayConverter(daily.dt)}</p>}
              </div>
              <div className="grid-b">
                {index === 0 ? (
                  <img
                    src={`icons/${data.current.weather[0].icon}.svg`}
                    alt="weericoon"
                  />
                ) : (
                  <img
                    src={`icons/${daily.weather[0].icon}.svg`}
                    alt="weericoon"
                  />
                )}
              </div>
              <div className="grid-c">{daily.temp.min.toFixed()}°</div>
              <div className="grid-d">—</div>
              <div className="grid-e">{daily.temp.day.toFixed()}&deg;</div>
            </article>
          );
        })}

        <div className="line-back" />

        <a href="https://openweathermap.org">
          <img
            src={openweather}
            className="openweather-logo"
            alt="OpenWeather logo"
          />
        </a>
      </main>
    </div>
  );
}
