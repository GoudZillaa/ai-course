import React, { useState, useEffect } from "react";
import "../../src/App.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const output = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, course, videoResults, mode } = location.state;
  const [extendedCourse, setExtendedCourse] = useState(null);
  const [isExtended, setIsExtended] = useState(mode === "extended");
  const [extendedVideoResults, setExtendedVideoResults] = useState(null);

  const courseData = isExtended ? extendedCourse.extendedConcepts : course.coreConcepts;
  const videoData = isExtended ? extendedVideoResults : videoResults;


useEffect(() => {
  const fetchExtended = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/extended`, { topic });
      const extendedData = res.data;
      setExtendedCourse(extendedData);

      const videoCache = {};

      const extendedVideoResults = await Promise.all(
        extendedData.extendedConcepts.map(async (concept) => {
          const query = concept.videoSearchQuery;

          if (videoCache[query]) return videoCache[query];

          try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/videos`, {
              query,
            });
            videoCache[query] = res.data;
            return res.data;
          } catch (err) {
            console.warn(`Video fetch failed for: ${query}`, err);
            return [];
          }
        })
      );

      setExtendedVideoResults(extendedVideoResults);

      // ✅ Upload course AFTER extended data is fetched
      uploadCourse(extendedData, extendedVideoResults);
    } catch (err) {
      console.error("Error fetching extended course:", err);
    }
  };

  const uploadCourse = async (extendedData, extendedVideos) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/save-course`,
        {
          topic,
          coreConcepts: course.coreConcepts,
          extendedConcepts: extendedData.extendedConcepts,
          videoResults,
          extendedVideoResults: extendedVideos
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Course saved:", res.data);
    } catch (err) {
      console.error("Error saving course", err);
    }
  };

  fetchExtended();
}, []);


  const handleExpand = () => {
    setIsExtended(true);
  };

  const handleBackToCore = () => {
    setIsExtended(false);
  };

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 font-semibold">
        No course data found. Please go back and enter a topic.
      </div>
    );
  }

  return (
    <div className="Output relative w-full h-full flex justify-center items-center">
      <div className="content_container w-180 h-full pt-4 pb-8">
        <div className="main w-full h-full flex flex-col">
          <div className="upper_block">
            <div className="title_container">
              <div className="title">
                <h3>
                  {isExtended
                    ? "Here's the deeper concepts to help you master the skill."
                    : "Here's the core concepts you need to work on first."}
                </h3>
              </div>
              <div className="subtitle text-[1rem]  font-medium leading-none text-gray-400">
                make sure to practise all these concepts
                <br /> to create a solid understanding
              </div>
            </div>
            <br />
          </div>

          <div className="course_content overflow-y-auto flex-1 py-6">
            {courseData.map((concept, index) => (
              <div key={index} className="content_block">
                <div className="content_title font-bold text-[1.2rem]">
                  {index + 1}. {concept.title}
                </div>
                <div className="content_explanation px-4 ">
                  <strong className="text-gray-600">explanation:</strong> {concept.explanation}
                </div>
                <div className="content_video_suggestions flex justify-between my-4 px-4">
                  {videoData[index]?.map((video, i) => (
                    <a key={i} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
                      <img className="w-48 aspect-video object-cover rounded-lg" src={video.thumbnail} alt={video.title} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="input_container absolute bottom-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl w-182 h-15 text-gray-600 font-bold flex justify-between px-2 items-center">
            <div className="flex justify-center text-xl">{isExtended ? "Wanna go back?" : "Wanna dive deep?"}</div>
            <button onClick={!isExtended ? handleExpand : handleBackToCore} className="bg-gray-300 p-2 rounded">
              <ArrowForwardRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default output;
