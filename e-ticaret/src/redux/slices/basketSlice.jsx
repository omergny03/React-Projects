import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

const getBasketFromStorage = () =>{
    if(localStorage.getItem("basket")){
        return JSON.parse(localStorage.getItem('basket'))
    }
   return [];
}

const writeFromBasketToStorage =(basket)=>{
    localStorage.setItem('basket',JSON.stringify(basket))
}


const initialState={
 basketProducts: getBasketFromStorage(),
 totalPrice:0 ,
 basketLoad:false,
}


export const basketSlice= createSlice({
    name:'basket',
    initialState,
    reducers:{
     
     addBasketProducts:(state,action)=>{
     const findProduct = state.basketProducts && state.basketProducts.find((product)=> product.id === action.payload.id)
     if(findProduct){
        const extractProducts = state.basketProducts.filter((product)=>product.id != action.payload.id);
        findProduct.count += action.payload.count;
        state.basketProducts = [...extractProducts,findProduct]
        writeFromBasketToStorage(state.basketProducts)

     }else{
        state.basketProducts = [...state.basketProducts, action.payload]; 
        writeFromBasketToStorage(state.basketProducts)
     }
    },
     
     deleteBasketProduct:(state,action)=>{
       
        const extractProducts2 = state.basketProducts.filter((product)=>product.id!=action.payload.id)
        state.basketProducts = extractProducts2
        writeFromBasketToStorage(state.basketProducts)
        
     },

    calculateTotalPrice:(state)=>{
        state.totalPrice=0
        state.basketProducts && state.basketProducts?.map((product)=>{
            state.totalPrice+=((product.count)*(product.price))
        })
    },

    setBasketLoad:(state)=>{
    state.basketLoad= !state.basketLoad
    }
    
    },
    extraReducers:(builder)=>{

    },
})
 export const {addBasketProducts,calculateTotalPrice,setBasketLoad,deleteBasketProduct} = basketSlice.actions 

export default basketSlice.reducer