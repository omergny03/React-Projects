import React from 'react'
import { useSelector } from 'react-redux'

function Basket() {
  const {basketProducts}=useSelector((store)=>store.basket)
  console.log(basketProducts)
  return (
    <div style={{height:'100vh'}}>
      Basket
    </div>
  )
}

export default Basket