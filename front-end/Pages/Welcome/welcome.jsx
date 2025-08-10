import React, { useEffect,useState } from "react";
import placeholder from "../../src/assets/youtube-placeholder.jpeg";
import UndoIcon from "@mui/icons-material/Undo";
import logo from "../../src/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import ThemeToggle from '../../Components/ThemeToggle/themeToggle'
import pareto from '../../src/assets/pareto.png'
import logoDark from '../../src/assets/logoDark.png'
import { useTheme } from "../../Context/themeContext";

const welcome = () => {
  const navigate = useNavigate();
  const {isDark } = useTheme();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="Welcome relative dark:bg-gray-900 dark:text-white flex w-full h-full ">
      <div className="navbar absolute w-full h-16 flex justify-between">
        <div className="left_div w-30 h-full flex justify-center items-center">
          <img src={isDark?logoDark:logo} className="h-24 w-auto " alt="" />
        </div>

        <div className="middle_div w-40 h-full flex justify-center items-center"></div>

        <div className=" flex justify-center items-center">
          <ThemeToggle variant="navbar"/>
        </div>
      </div>
      <div className="flex w-full h-full max-md:px-4 px-28">
        <div className="left_side w-full h-full flex flex-col max-md:gap-32 gap-18 justify-center">
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
            <button
              onClick={() => navigate("/login")}
              className="px-4 font-bold text-[1.2rem] py-2 border-gray-300 text-gray-500 rounded-lg border-3 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1 "
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 font-bold text-[1.2rem] py-2 bg-gray-300 text-gray-600 border-gray-300 rounded-lg border-2 hover:-translate-y-1 transition-transform duration-300 linear active:translate-y-1"
            >
              SignUp
            </button>
          </div>
        </div>

        <div className="right_side flex items-center max-md:hidden w-full h-full">
          <img src={pareto} className="drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default welcome;
