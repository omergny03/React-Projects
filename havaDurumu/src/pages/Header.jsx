import React from 'react'
import '../css/header.css'
import hava from '../images/hava.jpg'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <div className='header'>
        <div className='header-start'><img src={hava} style={{width:'130px',height:'70px'}} /></div>
        <div className='header-div'>
            <div className='header-middle' ><Link to={'/'} className='header-middle-link'>Anasayfa</Link></div>
            <div className='header-middle'><Link to={'/hakkinda'} className='header-middle-link'>Hakkında</Link></div>
        </div>
        <div className='header-end'>Giriş Yap</div>
        
       
    </div>
  )
}

export default Header