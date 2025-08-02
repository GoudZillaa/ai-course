import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useAuth } from '../../Context/authContext';

const home = () => {
    const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const {user} = useAuth();
  console.log(user)

  const handleSubmit = () => {
    if (!topic.trim()) return;
    navigate(`/loading?topic=${encodeURIComponent(topic)}`);
  };
  return (
    <div className='Home w-full relative inset-0 h-full flex justify-center items-center'>
      <div className="content_container w-180 h-full py-12">
        
        <div className="main w-full h-full flex flex-col justify-between">
            <div className="upper_block">
              <div className="title_container">
                <div className="title">
                  <h2>{`Hi there, ${user.username||'user'}.`}</h2>
                  <h2>What would you like to learn today?</h2>
                </div>
                <div className="subtitle text-[1.2rem]  font-medium leading-none text-gray-400">
                  here are some of the most <br /> commanly asked topics
                </div>
            </div><br />

            <div className="suggestion_block flex justify-between px-2 leading-none">

              <div className="suggestion_card">
                I want to learn javascript from scratch
              </div>

              <div className="suggestion_card">
                I want to learn javascript from scratch
              </div>

              <div className="suggestion_card">
                I want to learn javascript from scratch
              </div>

              <div className="suggestion_card rounded">
                I want to learn javascript from scratch
              </div>

            </div>
            </div>

            <div className="input_container w-full h-15 bg-white rounded-lg border-2 border-gray-300 text-gray-600 font-bold flex justify-between px-2 items-center">
                <div className='flex justify-center text-xl'>"I want to learn 
                  <input type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)} 
                  className='focus:outline-none text-black font-normal px-2 border-b-[1px] w-30' required /> from scratch"</div>
                <button onClick={handleSubmit} className='bg-gray-300 p-2 rounded'><ArrowForwardRoundedIcon/></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default home
