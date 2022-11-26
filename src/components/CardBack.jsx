import turn from '../assets/turn2.png';
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
    <div className="card-back">
      <img src={turn} alt="Flip card" className="flip" />

      {typeof cityNameNL !== 'undefined' ? (
        <p>
          <span className="city">{cityNameNL}</span>
          <span className="country">
            <sup>{countryName}</sup>
          </span>
        </p>
      ) : (
        <p>
          <span className="city">{cityName}</span>{' '}
          <span className="country">
            <sup>{countryName}</sup>
          </span>
        </p>
      )}

      {/* KOMENDE WEEK */}

      <div className="komende">
        <p>KOMENDE WEEK</p>
        <div className="line-back"></div>
      </div>

      {/* WEEK VERWACHTING */}

      <div className="card-back-grid">
        <div className="grid-a">
          <p>Vandaag</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[0].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[0].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[1].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[1].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[1].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[2].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[2].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[2].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[3].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[3].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[3].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[4].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[4].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[4].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[5].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[5].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[5].temp.day.toFixed()}&deg;</div>

        <div className="grid-a">
          <p>{dayConverter(data.daily[6].dt)}</p>
        </div>
        <div className="grid-b">
          <img
            src={`https://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}.png`}
            alt="weericoon"
          />
        </div>
        <div className="grid-c">{data.daily[6].temp.min.toFixed()}°</div>
        <div className="grid-d">—</div>
        <div className="grid-e">{data.daily[6].temp.day.toFixed()}&deg;</div>
      </div>
      <div className="line-back2"></div>
      <a href="https://openweathermap.org">
        <img
          src={openweather}
          className="openweather-logo"
          alt="OpenWeather logo"
        />
      </a>
    </div>
  );
}
