import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Current from './components/CardFront';
import Forecast from './components/CardBack';
import './App.css';

export default function AppWeather() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [input, setInput] = useState('');
  const [city, setCity] = useState('Amsterdam');
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);
  const [flipped, setFlipped] = useState(false)


  useEffect(() => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation({
          lat: data[0].lat,
          lon: data[0].lon,
          city: data[0].name,
          cityNL: data[0].local_names.nl,
          country: data[0].country,
        });
      });
  }, [city, apiKey]);

  useEffect(() => {
    if (!location) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&lang=nl&exclude=minutely&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [location, apiKey]);

  const cityName = location.city;
  const cityNameNL = location.cityNL;
  const countryName = location.country;

  return (
    <div className="weather">
      <Search input={input} setInput={setInput} setCity={setCity} />

      {typeof data.current !== 'undefined' ? (
        <div className="card">
          <div className="card-inner">
            <Current
              data={data}
              cityName={cityName}
              cityNameNL={cityNameNL}
              countryName={countryName}
              flipped={flipped}
              setFlipped={setFlipped}
            />
            <Forecast
              data={data}
              cityName={cityName}
              cityNameNL={cityNameNL}
              countryName={countryName}
              flipped={flipped}
              setFlipped={setFlipped}
            />
          </div>
        </div>
         ) : (
          <div>Voer een stad in</div>
      )}
    </div>
  );
}
