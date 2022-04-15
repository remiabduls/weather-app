import React, { useState } from 'react';
import Conditions from './Conditions/Conditions';
import classes from './Forecast.module.css';


const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});

    const uriEncodedCity = encodeURIComponent(city);
    

    function getForecast(e) {
        e.preventDefault();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': '74a1f602d8msha06a612c39b7cfcp1422b0jsn4e8e33804759'
        }
    };
    
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, options)
    .then(response => response.json())
    .then(response => {
        setResponseObj(response)
    })
   }
   

   return (
    <div>
        <h2>Find Current Weather Conditions</h2>
        
        <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <div className='button'>
                <button className={classes.Button} type="submit">Get Forecast</button></div>
            </form>
        <Conditions
               responseObj={responseObj}
               />
    </div>
   )
}

export default Forecast;