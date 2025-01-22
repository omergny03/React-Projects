import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const writeWeathersToStorage = (weathers)=>{
    localStorage.setItem('weathers',JSON.stringify(weathers))
}
const getWeathersFromStorage = ()=>{
    if(localStorage.getItem('weathers')){
        return JSON.parse(localStorage.getItem('weathers'))
    }
    return null
}

const initialState = {
  weathers:getWeathersFromStorage(),
  location:null,
  loading:false,
}


export const getWeathers=createAsyncThunk('weathers', async (location)=>{
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=5&aqi=yes&alerts=yes`); 
    return response.data;
})

export const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
         // http isteği olmazsa 
    },
    extraReducers:(builder)=>{
        // http isteğinde
        builder.addCase(getWeathers.pending,(state)=>{
            state.loading=true;
        })
       
        builder.addCase(getWeathers.fulfilled,(state,action)=>{
            state.loading=false
            state.weathers=action.payload
            writeWeathersToStorage(state.weathers)
        })
    } 
})

export const {  } = weatherSlice.actions
export default weatherSlice.reducer