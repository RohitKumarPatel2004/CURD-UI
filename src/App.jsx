import React, { useEffect, useState } from 'react'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import Home from './component/Home'
import Create from './component/Create'
import Read from './component/Read'
import Update from './component/Update'


function App() {
 

  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Create/>}   path='/create'/>
          <Route element={<Read/>} path='/read/:id'/>
          <Route element={<Update/>} path='/update/:id'/>
         
    
       </Routes>
    </BrowserRouter>


      

    </>
  )
}

export default App
