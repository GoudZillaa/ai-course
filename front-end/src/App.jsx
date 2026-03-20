import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route,useLocation} from 'react-router-dom'
import PrivateRoute from '../Components/PrivateRoute/privateRoute'

import Navbar from '../Components/Navbar/navbar'
import TopLoader from '../Components/TopLoader/topLoader'
import Home from '../Pages/Home/home'
import Test from '../Components/Test/test'
import Generating from '../Pages/Generating/generating'
import Output from '../Pages/Output/output'
import Login from '../Components/Login/login'
import Signup from '../Components/Signup/signup'
import Welcome from '../Pages/Welcome/welcome'
import SavedCoursePage from '../Pages/SavedCoursePage/savedCoursePage'

import { useLoading } from '../Context/loadingContext'
 
 function App() {
   const location = useLocation()
   const { setLoading } = useLoading()
  const hideNavbarRoutes = ['/', '/login', '/signup', '/welcome']
 
   const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

   useEffect(() => {
     // Safety reset: stop loader whenever route changes
     // Components that need a loader (like Generating) will set it to true themselves
     setLoading(false)
   }, [location.pathname, setLoading])

  return (
    <div className="App w-dvw min-h-dvh relative z-0 mesh-gradient text-black dark:text-white flex flex-col transition-colors duration-300">
      <TopLoader />
      {shouldShowNavbar && <Navbar />}

      <div className="flex-grow">

      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<PrivateRoute> <Home /> </PrivateRoute>}/>
        <Route path='/generating' element={<PrivateRoute> <Generating /> </PrivateRoute>}/>
        <Route path='/output' element={<PrivateRoute> <Output /> </PrivateRoute>}/>
        <Route path="/saved/:id" element={<PrivateRoute> <SavedCoursePage /> </PrivateRoute>} />
      </Routes>
      </div>
      
    </div>
  )
}

export default App
