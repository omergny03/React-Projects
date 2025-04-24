import React from 'react'
import '../css/Product.css'
import '../App.css'
import { useNavigate } from 'react-router-dom'



function Product({product}) {
    const {id ,title,image,price}=product
    const navigate = useNavigate();
  return (
    <div className='card'>
        <img className='image' src={image} alt="" />
        <div style={{marginTop:'-15px'}}>
        <p style={{padding:'5px'}}>{title}</p>
        <h3 style={{textAlign:'center'}}>{price} $</h3>
        </div>
        <button className='button' onClick={()=>navigate('/product/'+id)}>Detay</button>
    </div>
  )
}

export default Product