import React from "react";
import placeholder from '../../src/assets/youtube-placeholder.jpeg'
import UndoIcon from '@mui/icons-material/Undo';
import logo from '../../src/assets/logo.png';
import {Link,useNavigate} from 'react-router-dom'


const welcome = () => {
  const navigate = useNavigate()
  return (
    <div className="Welcome relative flex w-full h-full ">
      <div className="navbar absolute w-full h-16 flex justify-between">
        <div className="left_div w-30 h-full flex justify-center items-center">
          <img src={logo} className='h-24 w-auto' alt="" />
        </div>

        <div className="middle_div w-40 h-full flex justify-center items-center">
          some  options
        </div>
        
        <div className="right_div w-30 h-full flex justify-center items-center">
          login  button
        </div>
      </div>
      <div className="flex w-full h-fullb px-28">
      <div className="left_side w-full h-full flex flex-col gap-18 justify-center">
        <div className="text_div">
          <h1 className="font-bold ">Build Skills faster --</h1>
          <h2>
            Learn 20% that drives <br /> the 80% results.
          </h2>
          <p className=" font-bold text-[1.2rem] text-gray-500">
            Our AI powered course builder gives you a curriculum <br /> based on the pareto principle.
          </p>
          <p>login or signup to continue</p>
        </div>
        <div className="button_container w-[65%] flex gap-6">
          <button onClick={()=>navigate('/login')} className="px-4 font-bold text-[1.2rem] py-2 border-gray-300 text-gray-500 rounded-lg border-3 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1 ">
            Login
          </button>
          <button onClick={()=>navigate('/signup')} className="px-4 font-bold text-[1.2rem] py-2 bg-gray-300 text-gray-600 border-gray-300 rounded-lg border-2 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1">
            SignUp
          </button>
        </div>
      </div>


      <div className="right_side flex items-center w-full h-full">
        <div className="sample_images relative w-full h-100">
          {/* Box 1 - Img1 */}
          <div className="absolute z-10 top-20 left-20 w-64 h-40 overflow-hidden rounded-lg border-2 flex items-center justify-center">
            <img src={placeholder} className="w-full h-full object-cover" alt="" />
          </div>

          {/* "Learn 20% First" Arrow and Text */}
          <div className="absolute top-12 left-16 text-lg text-black">
            <div className="flex items-center gap-1">
              <span><UndoIcon className="-rotate-70"/></span>
              <span className="-mt-4">Learn 20% First</span>
            </div>
          </div>

          {/* Box 2 - Img2 */}
          <div className="absolute z-0 top-40 left-64 w-64 h-40 overflow-hidden rounded-lg border-2 border-black flex items-center justify-center">
            <img src={placeholder} className="w-full h-full object-cover"  alt="" />
          </div>

          {/* "Dive Deep Later" Arrow and Text */}
          <div className="absolute top-25 left-100 text-lg text-black">
            <div className="flex items-center leading-none">
              <span>Dive Deep later</span>
              <span><UndoIcon className="scale-x-[-1] mt-4 rotate-90"/></span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default welcome;
