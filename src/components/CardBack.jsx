import flipcard from '../assets/turn2.png';
import openweather from '../assets/openweather.png';

export default function Forecast({ data, cityName, cityNameNL, countryName }) {
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
    <main className="card__back">
      <img src={flipcard} alt="Flip card" className="flip" />
      <header>
        {cityNameNL ? (
          <span className="city">{cityNameNL}</span>
        ) : (
          <span className="city">{cityName}</span>
        )}
        <span className="country">
          <sup>{countryName}</sup>
        </span>
      </header>

      <div className="komende-week">
        <p>KOMENDE WEEK</p>
        <div className="line-back"></div>
      </div>

      <section className="card__back--grid">
        {data.daily.slice(0, 7).map((daily, index) => {
          return (
            <>
              <div className="grid-a">
                {index === 0 ? <p>Vandaag</p> : <p>{dayConverter(daily.dt)}</p>}
              </div>
              <div className="grid-b">
                {index === 0 ? (
                  <img
                    src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`}
                    alt="weericoon"
                  />
                ) : (
                  <img
                    src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}.png`}
                    alt="weericoon"
                  />
                )}
              </div>
              <div className="grid-c">{daily.temp.min.toFixed()}°</div>
              <div className="grid-d">—</div>
              <div className="grid-e">{daily.temp.day.toFixed()}&deg;</div>
            </>
          );
        })}
      </section>

      <div className="line-back2"></div>

      <a href="https://openweathermap.org">
        <img
          src={openweather}
          className="openweather-logo"
          alt="OpenWeather logo"
        />
      </a>
    </main>
  );
}
