import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TheSimpson from './views/TheSimpson'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TheSimpson/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
