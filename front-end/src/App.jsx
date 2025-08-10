import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route,useLocation} from 'react-router-dom'
import PrivateRoute from '../Components/PrivateRoute/privateRoute'

import Navbar from '../Components/Navbar/navbar'
import Home from '../Pages/Home/home'
import Test from '../Components/Test/test'
import Generating from '../Pages/Generating/generating'
import Output from '../Pages/Output/output'
import Login from '../Components/Login/login'
import Signup from '../Components/Signup/signup'
import Welcome from '../Pages/Welcome/welcome'
import SavedCoursePage from '../Pages/SavedCoursePage/savedCoursePage'

function App() {
  const location = useLocation()
 const hideNavbarRoutes = ['/', '/login', '/signup', '/welcome']

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <div className="App w-dvw h-dvh relative z-0 bg-[#eeeeee] text-black flex flex-col ">
      {shouldShowNavbar && <Navbar />}

      <div className="flex-grow">

      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<PrivateRoute> <Home /> </PrivateRoute>}/>
        <Route path='/loading' element={<PrivateRoute> <Generating /> </PrivateRoute>}/>
        <Route path='/output' element={<PrivateRoute> <Output /> </PrivateRoute>}/>
        <Route path="/saved/:id" element={<PrivateRoute> <SavedCoursePage /> </PrivateRoute>} />
      </Routes>
      </div>
      
    </div>
  )
}

export default App
