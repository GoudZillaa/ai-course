import React from "react";
import "../../src/App.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const output = () => {
  return (
    <div className="Output relative w-full h-full flex justify-center items-center">
      <div className="content_container w-180 h-full pt-4 pb-8">
        <div className="main w-full h-full flex flex-col">
          <div className="upper_block">
            <div className="title_container">
              <div className="title">
                <h3>Here's the core concepts you need to work on first.</h3>
              </div>
              <div className="subtitle text-[1rem]  font-medium leading-none text-gray-400">
                make sure to practise all these concepts
                <br /> to create a solid understanding
              </div>
            </div>
            <br />
          </div>

          <div className="course_content overflow-y-auto flex-1 py-6">

            <div className="content_block">
              <div className="content_title font-bold text-[1.2rem]">1.Variables & Data types</div>
              <div className="content_explanation px-4 ">
                <strong className="text-gray-600">explanation:</strong> Variables let you store and reuse values in your code, like numbers or words (called strings). JavaScript uses
                keywords like var, let, and const to create variables, and it handles data types (like numbers, strings, and booleans)
                automatically.
              </div>
              <div className="content_video_suggestions flex justify-between my-4 px-4">
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
              </div>
            </div>

            <div className="content_block">
              <div className="content_title font-bold text-[1.2rem]">1.Variables & Data types</div>
              <div className="content_explanation px-4 ">
                <strong className="text-gray-600">explanation:</strong> Variables let you store and reuse values in your code, like numbers or words (called strings). JavaScript uses
                keywords like var, let, and const to create variables, and it handles data types (like numbers, strings, and booleans)
                automatically.
              </div>
              <div className="content_video_suggestions flex justify-between my-4 px-4">
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
              </div>
            </div>

            <div className="content_block">
              <div className="content_title font-bold text-[1.2rem]">1.Variables & Data types</div>
              <div className="content_explanation px-4 ">
                <strong className="text-gray-600">explanation:</strong> Variables let you store and reuse values in your code, like numbers or words (called strings). JavaScript uses
                keywords like var, let, and const to create variables, and it handles data types (like numbers, strings, and booleans)
                automatically.
              </div>
              <div className="content_video_suggestions flex justify-between my-4 px-4">
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
                <div className="content_img bg-black w-48 rounded-lg h-27"></div>
              </div>
            </div>

            
          
          </div>

          <div className="input_container absolute bottom-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl w-182 h-15 text-gray-600 font-bold flex justify-between px-2 items-center">
            <div className="flex justify-center text-xl">
              Wanna dive deep?
            </div>
            <button className="bg-gray-300 p-2 rounded">
              <ArrowForwardRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default output;
