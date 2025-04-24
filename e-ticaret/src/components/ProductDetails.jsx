import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import '../css/ProductDetail.css'
import '../App.css'
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addBasketProducts } from '../redux/slices/basketSlice';


function ProductDetails() {
  const params = useParams();
  const {id}=params;
  const state = useSelector((store)=>store.product)
  const {product,selectedProduct}=state
    
     
  const dispatch = useDispatch();
  
  useEffect(()=>{
     getProductById()
  },[product])

  const getProductById = ()=>{
    product && product?.map((urun)=>{
       if(urun.id==id){
           dispatch(setSelectedProduct(urun))
       }
  })
  }
 
  const [count,setCount]=useState(1);

  const increment = ()=>{
    let artir;
    artir=count+1
    setCount(artir);
  }
  const decrement = ()=>{
    if(count>0){
        let azalt;
        azalt=count-1;
        setCount(azalt);
    }
  }
  
  const {category, description, image , price ,title }=selectedProduct
  const addBasket = ()=>{
    const payload = {
       id,
       category,
       description,
       image,
       price,
       title,
       count,
    }
    dispatch(addBasketProducts(payload))
  }

  return (
    <div style={{height:'100vh',marginTop:'25px'}}>
        
            <div className='flex-start'>
                     <img style={{width:'350px',height:'440px'}} src={selectedProduct.image} alt="" />
                     <div className='flex-column'>
                          <h3>{selectedProduct.title}</h3>
                           <h4>{selectedProduct.category}</h4>
                          <p style={{padding:'8px'}}>{selectedProduct.description}</p>
                           <h2 style={{border:'2px solid lightgray', padding:'3px',borderRadius:'5px'}}>{selectedProduct.price} $</h2>
                           <div className='flex-row'>
                           <CiSquarePlus onClick={increment} className='count' style={{marginRight:'10px'}}/>
                            <h4 style={{margin:'0px'}}>{count}</h4>
                           <CiSquareMinus onClick={decrement} className='count' style={{marginLeft:'10px'}} />
                           </div>
                           <button onClick={addBasket} style={{marginTop:'10px'}}>Sepete Ekle</button>
                     </div>
           </div>
    </div>
  )
}

export default ProductDetails