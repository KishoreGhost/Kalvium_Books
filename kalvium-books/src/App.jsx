import { useState } from 'react'
import './App.css'
import Home from './component/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./component/Register"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/register" element={<Register />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
