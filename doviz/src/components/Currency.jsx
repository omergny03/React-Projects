import React from 'react'
import '../css/Currency.css'
import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
 

const base_url="https://api.freecurrencyapi.com/v1/latest";
const api_key="fca_live_Typ6BuFS6zhoc5HIy6gvGxng1F40YBng1mDGWcP9";

function Currency() {
 
    const[amount,setAmount]= useState(0);
    const[fromCurrency,setFromCurrency]=useState('');
    const[toCurrency,setToCurrency]=useState('');
    const[resultAmount,setResultAmount]= useState(0);
    
    const getCurrency = async ()=>{
         
        const response = await axios.get(`${base_url}?apikey=${api_key}&base_currency=${fromCurrency}`)
        return response.data
    }
    

    const exchange = async()=>{

      const response = await getCurrency()
      const carpim = response.data[toCurrency]
      setResultAmount((carpim*amount).toFixed(2))
      


    }
 
 
 
    return (
    <div className='currency-div'>
             
             <div style={{ marginTop:'-20px', width:'400px',textAlign:'center',color:''}}>
                <h3 style={{backgroundColor:'black',color:'white'}}>DÖVİZ KURU UYGULAMASI</h3>
             </div>
            
             <div>
             <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" className='amount-input' id='miktar' style={{width:'70px',height:'35px'}}/>
             
            <select onChange={(e)=>setFromCurrency(e.target.value)} name="" style={{marginLeft:'5px'}}>
                <option value="">Seçiniz</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>
            </select>
            
            <FaArrowCircleRight  style={{fontSize:'20px',marginLeft:'5px'}}/>
            
            <select onChange={(e)=>setToCurrency(e.target.value)} name="" style={{marginLeft:'5px'}}>
                <option value="">Seçiniz</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>
            </select>
            <input value={resultAmount} onChange={(e)=>setResultAmount(e.target.value)} type="number" className='amount-input' id='miktar' style={{marginLeft:'5px',width:'70px',height:'35px'}}/>
            
             </div>

             <div>
                <button 
                onClick={exchange}
                id='cevir' style={{marginTop:'10px',width:'80px',height:'50px',backgroundColor:'red',color:'white',borderRadius:'10px',border:'none',cursor:'pointer'}}>Çevir</button>
             </div>

        
    </div>
  )
}

export default Currency