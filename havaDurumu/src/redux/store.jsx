import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../redux/slices/weatherSlice'
export const store = configureStore({
    reducer: {
      weather:weatherReducer,
    },
  })