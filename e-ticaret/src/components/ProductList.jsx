import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct } from '../redux/slices/productSlice'
import { useSelector } from 'react-redux'
import Product from '../components/Product'
import '../App.css'

function ProductList() {
  
  const dispatch = useDispatch()
  const {product} = useSelector((store)=>store.product)
 /*  console.log(product) */
 
  useEffect(()=>{
     dispatch(getProduct())
  },[dispatch]) 
 
  return (
    <div className='flex-row' style={{flexWrap:'wrap'}}>
      {product.map((product)=>(
        <Product
        key={product.id} 
        product={product}
        />
      ))}
    </div>
  )
}

export default ProductList