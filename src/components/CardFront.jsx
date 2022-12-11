import moment from 'moment';
import 'moment/locale/nl';
import sunset from '../assets/sunset.png';
import sunrise from '../assets/sunrise.png';
import humidity from '../assets/humidity.png';
import uvindex from '../assets/uv-index.png';
import cloud from '../assets/cloud.png';
import wind from '../assets/wind.png';
import flipcard from '../assets/turn.png';

export default function CardFront({
  data,
  cityNameEN,
  cityNameNL,
  countryName,
}) {
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
  console.log(data);

  return (
    <>
      <main className="card__front">
        <img src={flipcard} alt="Flip card" className="flip" />
        <header>
          <p>
            {cityNameNL ? (
              <span className="city">{cityNameNL}</span>
            ) : (
              <span className="city">{cityNameEN}</span>
            )}
            <span className="country">
              <sup>{countryName}</sup>
            </span>
          </p>
          <span className="time">
            {timeConverter(data.current.dt)}{' '}
            <span className="lokaal">
              <sup>lokaal</sup>
            </span>{' '}
          </span>
        </header>

        <section className="card__front--middle">
          <div className="temp">{data.current.temp.toFixed()}&deg;</div>
          Voelt als {data.current.feels_like.toFixed()}&deg;
          <p className="desc">{data.current.weather[0].description}</p>
        </section>

        <div className="line-front"></div>

        <section className="hours__container">
          {data.hourly.slice(0, 6).map((hourly, index) => {
            return (
              <article className="hour__card" key={index}>
                {index === 0 ? (
                  <div>Nu</div>
                ) : (
                  <div> {hourConverter(hourly.dt)}</div>
                )}
                <div>
                  <img
                    src={`icons/${hourly.weather[0].icon}.svg`}
                    alt={`${hourly.weather[0].description}`}
                  />
                </div>
                <div>{hourly.temp.toFixed()}&deg;</div>
              </article>
            );
          })}
        </section>

        <div className="line-front"></div>

        <section className="extra-info__container">
          <div className="extra-info__top">
            <article className="extra-info__card">
              <div>
                {' '}
                <img src={sunrise} width="30px" alt="Tijdstip zonsopgang"></img>{' '}
              </div>
              <div>{timeConverter(data.current.sunrise)}</div>
            </article>
            <article className="extra-info__card">
              <div>
                {' '}
                <img src={sunset} width="30px" alt="Tijdstip zonsondergang"></img>{' '}
              </div>
              <div>{timeConverter(data.current.sunset)}</div>
            </article>
            <article className="extra-info__card">
              <div>
                {' '}
                <img src={uvindex} width="30px" alt="UV-index"></img>{' '}
              </div>
              <div>{data.current.uvi.toFixed()}</div>
            </article>
          </div>

          <div className="extra-info__bottom">
            <article className="extra-info__card">
              <div>
                {' '}
                <img src={cloud} width="30px" alt="Bewolking"></img>{' '}
              </div>
              <div>{data.current.clouds}%</div>
            </article>
            <article className="extra-info__card">
              <div>
                {' '}
                <img src={wind} width="30px" alt="Windsnelheid"></img>{' '}
              </div>
              <div>{data.current.wind_speed.toFixed(1)} m/s</div>
            </article>
            <article className="extra-info__card">
              <div>
                {' '}
                <img
                  src={humidity}
                  width="30px"
                  alt="Luchtvochtigheid"
                ></img>{' '}
              </div>
              <div>{data.current.humidity}%</div>
            </article>
          </div>
        </section>
      </main>{' '}
    </>
  );
}
