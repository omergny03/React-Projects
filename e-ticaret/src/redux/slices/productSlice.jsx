import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const getSelectedProductFromStorage = ()=>{
    if(localStorage.getItem('selected-product')){
        return JSON.parse(localStorage.getItem('selected-product'))
    }
    return {}
}

const writeSelectedProductToStorage = (product)=>{
    localStorage.setItem('selected-product',JSON.stringify(product))
}

const initialState={
    product:[],
    selectedProduct:getSelectedProductFromStorage(),
    loading:false,
}

export const getProduct = createAsyncThunk('products',async()=>{
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data
})

export const productSlice= createSlice({
    name:'product',
    initialState,
    reducers:{
        /* http isteği olmayan fonksiyonlar burada yazılır */
        setSelectedProduct: (state,action) => {
           state.selectedProduct=action.payload
           writeSelectedProductToStorage(state.selectedProduct)
        } 
    },
    extraReducers:(builder)=>{
        builder.addCase(getProduct.pending,(state)=>{
            state.loading=true
        })
        
        builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.product= action.payload
        })

    },
})
 export const {setSelectedProduct} = productSlice.actions 

export default productSlice.reducer