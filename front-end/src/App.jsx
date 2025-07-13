import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../Components/Navbar/navbar'
import Home from '../Pages/Home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-screen h-screen bg-[#eeeeee] text-black flex ">
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App
