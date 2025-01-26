import React, { useEffect, useState } from 'react'
import '../css/home.css'
import '../css/animation.css'
import { TbCloudSearch } from "react-icons/tb";
import Cards from '../components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { getWeathers, updateLocation } from '../redux/slices/weatherSlice';
import SelectedDay from '../components/SelectedDay';
import { FaLocationDot } from "react-icons/fa6";

function Home() {
  const [location,setLocation] = useState("");
  const dispatch = useDispatch()
  const state = useSelector((store)=>store.weather)
  const {weathers,location_state}=state;
  const selectedDay=weathers.forecast.forecastday[0]
 
  useEffect(()=>{
      const fetchData =()=>{
         try {
          dispatch(getWeathers(location_state))
          console.log(weathers)
        } catch (error) {
           console.log(error);
         }
      }
      if (location) { 
        fetchData();
      }
  },[location_state])

  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
         await getCityNameFromOpenCage(latitude, longitude);
        },
        (error) => {
          console.error("Konum alınamadı:", error);
        }
      );
    } else {
      console.error("Tarayıcınız konum özelliğini desteklemiyor.");
    }
  };
const getCityNameFromOpenCage = async (lat, lon) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${import.meta.env.VITE_LOCATION_API}`
  );
  const data = await response.json();
  const city =data.results[0].components.city
  console.log("Şehir:", city);
  const updatecity = city.split(' ')
  dispatch(updateLocation(updatecity[0]))
};
 const handle = ()=>{
  getLocation()
 }


  return (
    <div className='home-genel-div' >
        <div className='input-icon'>
           <div>
           <input className='input' type="text" placeholder='Bir şehir giriniz' value={location} onChange={(e)=>{setLocation(e.target.value)}} />
          <TbCloudSearch className='input-icon' onClick={()=>{
            dispatch(updateLocation(location))
            }}/>
           </div>
            <div className='konum'><FaLocationDot style={{fontSize:'23px'}} onClick={()=>{handle()}} /></div>
        </div>
      
         {selectedDay && (
          <div className='home-data-single-div'>
            {
             
                <SelectedDay 
                key={selectedDay.date}
                day={selectedDay}
                />
              
            }
          </div>
        )}  
        
        {weathers && (
          <div className='home-data-div'>
            {
              weathers.forecast.forecastday.map((day)=>(
                <Cards 
                key={day.date}
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