import React, { useRef, useState } from "react";
import './weather.css'


function Weather(){
    const [weatherData, setWeatherData] = useState(null);
    const ip = useRef(null);
    const [errMsg,setErrMsg] = useState('');

    // const divMsg = useRef(null)
    
    function getData(){
        const city = ip.current.value;

        fetchData(city);
        ip.current.value="";
    }

    async function fetchData(cityName){
        
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=909cca6a9784fb36b9978965d29f1625`)
            
            if(!response.ok){
                throw new Error('City not found');
            }
            const data = await response.json()
            setWeatherData(data);
        }catch(err){
            setErrMsg(`Error : ${cityName} city not found`);
            
            // console.error("Error fetching weather data", err);
            setWeatherData('');
        }
    }
    return(


        <div className="outerBox" >
            <h2>Weather App</h2>
            <div className="outerBoxTop">
                <input type="text" placeholder="Enter a City Name: "  ref={ip}/>
                <button type="button" onClick={getData}><i><i className="fa-solid fa-magnifying-glass"></i></i></button>
            </div>
            {
                weatherData ? <div>
                    <div className="outerBoxMid">
                        <p className="cityName">{weatherData.name}</p>
                        <div className="iconBox">
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} style={{width:'80px',height:'80px'}} alt="weatherImage">
                            </img>
                        </div>
                        <p className="temp">{weatherData.main.temp}&deg;</p>
                        <p className="weather">{weatherData.weather[0].description}</p>
                    </div>

                    <div className="outerBoxBot">
                        <div className="box clouds" style={{}}>
                            <p>Clouds</p>
                            <p><i className="fa-solid fa-cloud"></i></p>
                            <p className="percent">{weatherData.clouds.all}%</p>

                        </div>
                        <div className="box humidity">
                            <p>Humidity</p>
                            <p><i className="fa-solid fa-droplet"></i></p>
                            <p className="percent">{weatherData.main.humidity}%</p>

                        </div>
                        <div className="box wind">
                            <p>Wind</p>
                            <p><i className="fa-solid fa-wind"></i></p>
                            <p className="percent">{weatherData.wind.speed}%</p>

                        </div>
                    </div>
                </div> :<p className="errMsg">{errMsg}</p>
            }

        </div>
    )
}

export default Weather;