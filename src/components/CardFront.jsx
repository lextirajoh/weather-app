import moment from 'moment';
import 'moment/locale/nl';
import '../App.css';
import sunset from '../assets/sunset.png';
import sunrise from '../assets/sunrise.png';
import humidity from '../assets/humidity.png';
import uvindex from '../assets/uv-index.png';
import cloud from '../assets/cloud.png';

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
      <div className="card-front">
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
          <span className="time">{timeConverter(data.current.dt)} <span className="lokaal"><sup>lokaal</sup></span> </span>
        </header>

        {/* MIDDEN */}

        <div className="card-front-middle">
          <div className="temp-and-icon">
            <span className="card-front-temp">
              {data.current.temp.toFixed()}&deg;
            </span>
          </div>
          Voelt als {data.current.feels_like.toFixed()}&deg;
          <p className="card-front-desc">
            {data.current.weather[0].description}
          </p>
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

        {/* komende uren voorspelling */}

        <div className="hours-forecast-wrapper">
          <div className="hour-container">
            <div>Nu</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`}
                alt="weericoon"
              />
            </div>
            <div>{data.hourly[0].temp.toFixed()}&deg;</div>
          </div>

          <div className="hour-container">
            <div> {hourConverter(data.hourly[1].dt)}</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.hourly[1].weather[0].icon}.png`}
                alt="weericoon"
              />
            </div>
            <div>{data.hourly[1].temp.toFixed()}&deg;</div>
          </div>

          <div className="hour-container">
            <div> {hourConverter(data.hourly[2].dt)}</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.hourly[2].weather[0].icon}.png`}
                alt="weericoon"
              />
            </div>
            <div>{data.hourly[2].temp.toFixed()}&deg;</div>
          </div>

          <div className="hour-container">
            <div> {hourConverter(data.hourly[3].dt)}</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.hourly[3].weather[0].icon}.png`}
                alt="weericoon"
              />
            </div>
            <div>{data.hourly[3].temp.toFixed()}&deg;</div>
          </div>

          <div className="hour-container">
            <div> {hourConverter(data.hourly[4].dt)}</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${data.hourly[4].weather[0].icon}.png`}
                alt="weericoon"
              />
            </div>
            <div>{data.hourly[4].temp.toFixed()}&deg;</div>
          </div>
        </div>

        <div className="line-front-bottom"></div>

        <div className="card-back-info">
          <div className="info-container">
            <div>
              {' '}
              <img src={sunrise} width="30px" alt="zonsopgang"></img>{' '}
            </div>
            <div>{timeConverter(data.current.sunrise)}</div>
          </div>

          <div className="info-container">
            <div>
              {' '}
              <img src={sunset} width="30px" alt="zonsondergang"></img>{' '}
            </div>
            <div>{timeConverter(data.current.sunset)}</div>
          </div>

          <div className="info-container">
            <div>
              {' '}
              <img src={uvindex} width="30px" alt="UV-index"></img>{' '}
            </div>
            <div>{data.current.uvi.toFixed()}</div>
          </div>

          <div className="info-container">
            <div>
              {' '}
              <img src={cloud} width="30px" alt="Bewolking"></img>{' '}
            </div>
            <div>{data.current.clouds}%</div>
          </div>

          <div className="info-container">
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
      </div>{' '}
    </>
  );
}
