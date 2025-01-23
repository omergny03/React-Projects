import React, { useEffect, useState } from 'react'
import '../css/home.css'
import '../css/animation.css'
import Lottie from 'lottie-react';
import gif from '../images/gunesli.gif';

function SelectedDay({day}) {
    const [animationData, setAnimationData] = useState(null);
    const getAnimationDataUrl = () => {
        if (day.day.condition.text === 'Cloudy') return 'https://assets10.lottiefiles.com/packages/lf20_jz5rvjiv.json';
        if (day.day.condition.text === 'Rainy') return rainyAnimation;
        return null;
      };
 
        useEffect(() => {
            const fetchAnimation = async () => {
                const url = 'https://assets2.lottiefiles.com/packages/lf20_jvxwtdtp.json';  // Yağmur animasyonu

              if (url) {
                try {
                  const response = await fetch(url);
                  if (!response.ok) {
                    console.log('Animasyon yüklenemedi.')
                  }
                  const data = await response.json();
                  setAnimationData(data);
                } catch (error) {
                  console.log('Animasyon yükleme hatası:', error);
                }
              }
            };
            fetchAnimation();
          }, [day]);

          return (
            <div className="weather-container">
              <div className="animation-bg">
                {/* {animationData && <Lottie animationData={animationData} loop={true} />} */}
                <img src={gif} alt="" style={{height:'100%',width:'100%'}}/>
              </div>
              <div className="weather-info">
                <h3>{day.date}</h3>
                <img src={day.day.condition.icon} alt="weather-icon" />
                <div><b>{day.day.avgtemp_c} °C</b></div>
                <div>{day.day.condition.text}</div>
              </div>
            </div>
          );
}

export default SelectedDay