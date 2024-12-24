import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_bar.png'
import sun_icon from '../assets/sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import storm_icon from '../assets/storm.png'
import weather_icon from '../assets/weather.png'
// import wind_icon from '../assets/wind.png'
import weather1_icon from '../assets/weather1.png'



const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d" : sun_icon,
        "01n" : sun_icon,
        "02d" : wind_icon,
        "02n" : wind_icon,
        "03d" : storm_icon,
        "03n" : storm_icon,
        "04d" : weather_icon,
        "04n" : weather_icon,
        "09d" : weather1_icon,
        "09n" : weather1_icon,
        "10d" : sun_icon,
        "10n" : sun_icon,
        "13d" : sun_icon,
        "13n" : sun_icon,
    }
        
    
    const search = async (city) => {

        if(city === ''){
            alert('Please enter a city name');
            return;
        }

        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            // if(!response.ok)
            // alert(data.message);
            // return;
            console.log(data);
            const icons = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity : data.main.humidity,
                wind : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icons
            })
          } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    useEffect(()=>{
        search('London');
    },[]) 

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref = {inputRef} type="text" placeholder='Enter City Name' />
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
        </div>

        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temp'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
                </div>


                <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.wind}km/h</p>
                    <span>wind speed</span>
                </div>
                </div>
        </div>
        </> : <></>}

       
    </div>

  )
}

export default Weather