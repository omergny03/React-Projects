import React, { useEffect, useState } from 'react'
import '../css/home.css'
import '../css/animation.css'
import modarateRain from '../images/moderateRain.gif';
import partlyCloudy from '../images/partlyCloudy.gif';

function SelectedDay({day}) {
    
  const getAnimationData = () => {
      const conditionText = day.day.condition.text.trim().toLowerCase();
        if (conditionText === 'moderate rain') return modarateRain;
        if (conditionText=== 'partly cloudy') return partlyCloudy;
        return null;
      };
  const getAnimationColor = ()=>{
     const conditionText = day.day.condition.text.trim().toLowerCase();
     if (conditionText === 'moderate rain') return 'white';
     if (conditionText=== 'partly cloudy') return 'white';
     return null;
  };
          return (
            <div className="weather-container">
              <div className="animation-bg">
                <img src={`${getAnimationData()}`} alt="" style={{height:'100%',width:'100%'}}/>
              </div>
              <div className="weather-info" style={{color:`${getAnimationColor()}`}}>
                <h3>{day.date}</h3>
                <img src={day.day.condition.icon} alt="weather-icon" />
                <div><b>{day.day.avgtemp_c} °C</b></div>
                <div>{day.day.condition.text}</div>
              </div>
            </div>
          );
}

export default SelectedDay