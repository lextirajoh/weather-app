import moment from 'moment';
import 'moment/locale/nl';
import sunset from '../assets/sunset.png';
import sunrise from '../assets/sunrise.png';
import humidity from '../assets/humidity.png';
import uvindex from '../assets/uv-index.png';
import cloud from '../assets/cloud.png';
import wind from '../assets/wind.png';
import flipcard from '../assets/turn.png';

export default function Current({ data, cityName, cityNameNL, countryName }) {
  const d = new Date();
  const userOffset = d.getTimezoneOffset() * 60;

  function timeConverter(unix_timestamp) {
    const localTime = moment
      .unix(unix_timestamp + userOffset + data.timezone_offset)
      .format('HH:mm');
    return localTime;
  }

  function hourConverter(unix_timestamp) {
    const localHour = moment
      .unix(unix_timestamp + userOffset + data.timezone_offset)
      .format('HH');
    return localHour;
  }

  return (
    <>
      <div className="card__front">
        <img src={flipcard} alt="Flip card" className="flip" />
        <header>
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
          <span className="time">
            {timeConverter(data.current.dt)}{' '}
            <span className="lokaal">
              <sup>lokaal</sup>
            </span>{' '}
          </span>
        </header>

        <div className="card__front--middle">
          <div className="temp">{data.current.temp.toFixed()}&deg;</div>
          Voelt als {data.current.feels_like.toFixed()}&deg;
          <p className="desc">{data.current.weather[0].description}</p>
        </div>

        {/* ALERT */}

        {/* <div className="alert">
          {!data.alerts ? (
            <p>Geen waarschuwingen op dit moment.</p>
          ) : (
            <p>
              <i>{data.alerts[0].event}</i>
            </p>
          )}
          <div className="line"></div>
        </div> */}

        {/* KOMENDE UREN */}

        <div className="hours__container">
          {data.hourly.slice(0, 6).map((hourly, index) => {
            return (
              <div className="hour__card" key={index}>
                {index === 0 ? (
                  <div>Nu</div>
                ) : (
                  <div> {hourConverter(hourly.dt)}</div>
                )}
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`}
                    alt="weericoon"
                  />
                </div>
                <div>{hourly.temp.toFixed()}&deg;</div>
              </div>
            );
          })}
        </div>

        <div className="line-front"></div>

        <div className="extra-info__container">
          <div className="extra-info__top">
            <div className="extra-info__card">
              <div>
                {' '}
                <img src={sunrise} width="30px" alt="zonsopgang"></img>{' '}
              </div>
              <div>{timeConverter(data.current.sunrise)}</div>
            </div>

            <div className="extra-info__card">
              <div>
                {' '}
                <img src={sunset} width="30px" alt="zonsondergang"></img>{' '}
              </div>
              <div>{timeConverter(data.current.sunset)}</div>
            </div>

            <div className="extra-info__card">
              <div>
                {' '}
                <img src={uvindex} width="30px" alt="UV-index"></img>{' '}
              </div>
              <div>{data.current.uvi.toFixed()}</div>
            </div>
          </div>
          <div className="extra-info__bottom">
            <div className="extra-info__card">
              <div>
                {' '}
                <img src={cloud} width="30px" alt="Bewolking"></img>{' '}
              </div>
              <div>{data.current.clouds}%</div>
            </div>

            <div className="extra-info__card">
              <div>
                {' '}
                <img src={wind} width="30px" alt="Windsnelheid"></img>{' '}
              </div>
              <div>{data.current.wind_speed.toFixed(1)} m/s</div>
            </div>

            <div className="extra-info__card">
              <div>
                {' '}
                <img
                  src={humidity}
                  width="30px"
                  alt="luchtvochtigheid"
                ></img>{' '}
              </div>
              <div>{data.current.humidity}%</div>
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
