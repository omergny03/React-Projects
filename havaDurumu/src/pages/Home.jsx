import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { TbCloudSearch } from "react-icons/tb";
import axios from 'axios';
import Cards from '../components/Cards';

function Home() {
  const [location,setLocation] = useState("");
  const [weather,setWeather] = useState(null);
  const [run,setRun]=useState(false);
  useEffect(()=>{
      const fetchData = async()=>{
         try {
          const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`);
          console.log(response)
          setWeather(response.data)
         } catch (error) {
           console.log(error);
         }
      }
      if (location) { 
        fetchData();
      }
  },[run])
  return (
    <div className='home-genel-div'>
        <div className='input-icon'>
          <input className='input' type="text" placeholder='Bir şehir giriniz' value={location} onChange={(e)=>{setLocation(e.target.value)}} />
          <TbCloudSearch className='input-icon' onClick={()=>{setRun(!run)}}/>
        </div>
        
        <div style={{marginTop:25}}>
           {location && (
              <h2>{location} Hava Durumu</h2>
           )}
        </div>

        {weather && (
          <div className='home-data-div'>
            {
              weather.forecast.forecastday.map((day)=>(
                <Cards 
                //key={day.current.cloud}
                day={day}
                />
              ))
            }
          </div>
        )}
    </div>
  )
}

export default Home