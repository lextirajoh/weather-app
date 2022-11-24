import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';
import './App.css';

export default function AppWeather() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [input, setInput] = useState('');
  const [city, setCity] = useState('amsterdam');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
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
  }, [city]);

  useEffect(() => {
    if (!location) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&lang=nl&exclude=minutely&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [location]);

  const cityName = location.city;
  const cityNameNL = location.cityNL;
  const countryName = location.country;
  // console.log(location)

  return (
    <div className="weather">
      <Search input={input} setInput={setInput} setCity={setCity} />

      {data.current ? (
        <div className="card">
          <div className="card-inner">
            <CardFront
              data={data}
              cityName={cityName}
              cityNameNL={cityNameNL}
              countryName={countryName}
            />
            <CardBack
              data={data}
              cityName={cityName}
              cityNameNL={cityNameNL}
              countryName={countryName}
            />
          </div>
        </div>
         ) : (
          <div>Voer een stad in</div>
      )}
    </div>
  );
}
