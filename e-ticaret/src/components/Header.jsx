import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBasketShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { getProduct } from '../redux/slices/productSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { setBasketLoad } from '../redux/slices/basketSlice';

function Header() {

  const[blackTheme,setBlackTheme]=useState(false);
  const[whiteTheme,setWhiteTheme]=useState(true);
  const navigate = useNavigate()
 
  const changeBlackTheme = ()=>{
    const root = document.getElementById('root')
    setBlackTheme(!blackTheme);
    if(blackTheme){
      root.style.backgroundColor='black';
      root.style.color='#fff'
      setWhiteTheme(!whiteTheme)
    }
  }
  const changeWhiteTheme = ()=>{
    const root = document.getElementById('root')
    setWhiteTheme(!whiteTheme);
    if(true){
      root.style.backgroundColor='blanchedalmond';
      root.style.color='black'
      setBlackTheme(!blackTheme)
    }
  }
  const {basketProducts} = useSelector((store)=>store.basket)
  const dispatch = useDispatch()
  
  return (
    <div className='header'>
        <div className='header-logo'>
            <img style={{width:'100px'}} src={logo} alt="" />
        </div>
         <nav className='header-nav-bar'>
            <ul>
                <li>
                <Link className='link' to={'/'}>Home</Link>
                </li>
                <li>
                <Link className='link' to={'/about'}>About</Link>
                </li>
                <li>
                <Link className='link' to={'/products'}>Products</Link>
                </li>
            </ul>
         </nav>
         <div className='flex-row'>
          <input className='header-input' type="text" placeholder='Arama' />
          <div >
          <Badge badgeContent={basketProducts.length} color="primary" style={{marginRight:'5px',marginTop:'-17px'}}>
          <FaBasketShopping onClick={()=>dispatch(setBasketLoad())} style={{fontSize:'25px', marginLeft:'5px',cursor:'pointer'}}/>
          </Badge>
           {whiteTheme?<CiDark onClick={changeBlackTheme}style={{fontSize:'25px', marginLeft:'5px',cursor:'pointer'}} /> :<CiLight onClick={changeWhiteTheme} style={{fontSize:'25px', marginLeft:'5px',cursor:'pointer'}} />}
          </div>
         </div> 
         
    </div>
  )
}

export default Header