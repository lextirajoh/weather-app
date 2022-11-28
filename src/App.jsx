import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';

export default function App() {
  const apiKey = 'a579bad7a75725b1c18b236cd1878ba0';
  const [input, setInput] = useState('');
  const [city, setCity] = useState('amsterdam');
  const [location, setLocation] = useState({
    city: 'Amsterdam',
    cityNL: 'Amsterdam',
    country: 'NL',
    lat: 52.3727598,
    lon: 4.8936041,
  });
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

  const cityNameEN = location.city;
  const cityNameNL = location.cityNL;
  const countryName = location.country;

  console.log(cityNameEN);


  return (
    <div className="container">
      <Search input={input} setInput={setInput} setCity={setCity} />

      {data.current ? (
        <>
          <div className="card">
            <input id="toggle" type="checkbox" />
            <label htmlFor="toggle">
              <div className="card__inner">
                <CardFront
                  data={data}
                  cityNameEN={cityNameEN}
                  cityNameNL={cityNameNL}
                  countryName={countryName}
                />
                <CardBack
                  data={data}
                  cityNameEN={cityNameEN}
                  cityNameNL={cityNameNL}
                  countryName={countryName}
                />
              </div>
            </label>
          </div>
        </>
      ) : (
        <div>Voer een stad in</div>
      )}
    </div>
  );
}
