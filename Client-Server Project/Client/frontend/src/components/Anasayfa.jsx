import React from 'react'
import Masa from './Masa';
import { Button } from '@mui/material';

function Anasayfa(props) {
    const{array,updateCommand,send}=props;

  
  return (
    <div style={{height:'100lh'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', marginBottom:'20px'}}>
            <h1>KÜTÜPHANEYE HOŞ GELDİNİZ</h1> 
        </div>   
        <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'20px 30px',rowGap:'20px',columnGap:'20px'}}>
         {
            array.map((item,index)=>(
               item === 'Tables:'|| index==31  ? console.log("geçersiz") : <Masa key ={index} status={item} updateCommand={updateCommand} send={send} count={index}/>
               
            ))
         }
        </div> 
    </div>
  )
}

export default Anasayfa