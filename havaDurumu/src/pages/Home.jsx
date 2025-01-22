import React, { useEffect, useState } from 'react'
import '../css/home.css'
import '../css/animation.css'
import { TbCloudSearch } from "react-icons/tb";
import Cards from '../components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { getWeathers } from '../redux/slices/weatherSlice';
import SelectedDay from '../components/SelectedDay';

function Home() {
  const [location,setLocation] = useState("");
  const [run,setRun]=useState(false);
  const dispatch = useDispatch()
  const state = useSelector((store)=>store.weather)
  const {weathers}=state;
  const selectedDay=weathers.forecast.forecastday[0]
 
  useEffect(()=>{
      const fetchData =()=>{
         try {
          dispatch(getWeathers(location))
          console.log(weathers)
        } catch (error) {
           console.log(error);
         }
      }
      if (location) { 
        fetchData();
      }
  },[run])

  return (
    <div className='home-genel-div' >
        <div className='input-icon'>
          <input className='input' type="text" placeholder='Bir şehir giriniz' value={location} onChange={(e)=>{setLocation(e.target.value)}} />
          <TbCloudSearch className='input-icon' onClick={()=>{setRun(!run)}}/>
        </div>
        
  {/*       <div style={{marginTop:25}}>
           {location && (
              <h2>{location} Hava Durumu</h2>
           )}
        </div> */}

        

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