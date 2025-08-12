import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useAuth } from '../../Context/authContext';

const home = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const handleSubmit = (selectedTopic) => {
    const finalTopic = selectedTopic || topic;
    if (!finalTopic.trim()) return;
    navigate(`/loading?topic=${encodeURIComponent(finalTopic)}`);
  };

  const suggestions = [
    "Digital Marketing & Business",
    "Technology & Programming",
    "Health, Wellness & Self-Development",
    "Finance & Personal Development"
  ];

  return (
    <div className="Home w-full max-md:h-dvh dark:bg-gray-900 bg-white relative inset-0 h-full flex justify-center items-center">
      <div className="content_container max-md:w-screen max-md:px-4 max-md:py-24 w-180 h-full py-12">
        <div className="main w-full h-full flex flex-col justify-between">
          <div className="upper_block">
            <div className="title_container">
              <div className="title dark:text-white">
                <h2>{`Hi there, ${user.username || 'user'}.`}</h2>
                <h2>What would you like to learn today?</h2>
              </div>
              <div className="subtitle text-[1.2rem] max-md:hidden font-medium leading-none text-gray-400">
                here are some of the most <br /> commonly asked topics
              </div>
            </div>
            <br />

            <div className="suggestion_block flex max-md:flex-col max-md:hidden justify-between px-2 leading-none gap-3">
              {suggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="suggestion_card dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
                  onClick={() => handleSubmit(s)}
                >
                  I want to learn {s} from scratch.
                </div>
              ))}
            </div>
          </div>

          <div className="input_container w-full h-15 bg-white rounded-lg border-2 border-gray-300 text-gray-600 font-bold flex justify-between px-2 items-center">
            <div className="flex justify-center text-xl">
              "I want to learn
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="focus:outline-none text-black font-normal px-2 border-b-[1px] w-30"
                required
              />{" "}
              from scratch"
            </div>
            <button
              onClick={() => handleSubmit()}
              className="bg-gray-300 p-2 rounded"
            >
              <ArrowForwardRoundedIcon sx={{ color: "black" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
