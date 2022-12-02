import React, { useEffect, useState } from 'react';
import CardBack from './components/CardBack';
import CardFront from './components/CardFront';
import Search from './components/Search';
import './App.css';

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [data, setData] = useState({});
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=nl&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation({
            lat: data.coord.lat,
            lon: data.coord.lon,
            city: data.name,
            country: data.sys.country,
          });
        });
    };
    fetchData();
  }, [lat, lon]);

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
