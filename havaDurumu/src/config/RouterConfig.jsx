import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'

function RouterConfig() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hakkinda' element={<About/>}/>
    </Routes>
  
    
  )
}

export default RouterConfig