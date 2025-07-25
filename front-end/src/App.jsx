import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route,useLocation} from 'react-router-dom'

import Navbar from '../Components/Navbar/navbar'
import Home from '../Pages/Home/home'
import Test from '../Components/Test/test'
import Generating from '../Pages/Generating/generating'
import Output from '../Pages/Output/output'
import Login from '../Components/Login/login'
import Signup from '../Components/Signup/signup'
import Welcome from '../Pages/Welcome/welcome'

function App() {
  const location = useLocation()
  const [count, setCount] = useState(0)
  const [isLoggedIn,setIsLoggedIn]= useState(false)

  useEffect(()=>{
    if(location.pathname === '/home'){
      setIsLoggedIn(true)
    }
  },[location])

  return (
    <div className="App w-screen h-screen relative z-0 bg-[#eeeeee] text-black flex ">
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/loading' element={<Generating />}/>
        <Route path='/output' element={<Output />}/>
        <Route path='/test' element={<Test />}/>
      </Routes>
      
    </div>
  )
}

export default App
