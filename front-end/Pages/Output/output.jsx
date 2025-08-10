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
    <div className="Output relative w-full h-full flex dark:bg-gray-800 py-8 justify-center items-center overflow-x-hidden">
      <div className="content_container w-full max-w-4xl h-full pt-4 pb-20 px-4 overflow-x-hidden">
        <div className="main w-full h-full flex flex-col overflow-x-hidden">
          <div className="upper_block">
            <div className="title_container">
              <div className="title dark:text-white">
                <h3>
                  {isExtended
                    ? "Here's the deeper concepts to help you master the skill."
                    : "Here's the core concepts you need to work on first."}
                </h3>
              </div>
              <div className="subtitle text-[1rem] font-medium leading-none text-gray-400">
                make sure to practise all these concepts
                <br /> to create a solid understanding
              </div>
            </div>
            <br />
          </div>

          <div className="course_content overflow-y-auto flex-1 py-6">
            {courseData.map((concept, index) => (
              <div key={index} className="content_block mb-6">
                <div className="content_title dark:text-white font-bold text-[1.2rem] mb-2">
                  {index + 1}. {concept.title}
                </div>
                <div className="content_explanation px-4 dark:text-white mb-4">
                  <strong className="dark:text-gray-400 text-gray-600">explanation:</strong> {concept.explanation}
                </div>
                <div className="content_video_suggestions w-full overflow-hidden px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {videoData[index]?.map((video, i) => (
                      <a key={i} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer" className="block w-full">
                        <img 
                          className="w-full max-w-full aspect-video object-cover rounded-lg hover:scale-105 transition-transform" 
                          src={video.thumbnail} 
                          alt={video.title} 
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="input_container fixed bottom-4 left-4 right-4 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl h-15 text-gray-600 font-bold flex justify-between px-4 py-2 items-center">
            <div className="flex dark:text-white justify-center text-sm md:text-lg flex-1">
              {isExtended ? "Wanna go back?" : "Wanna dive deep?"}
            </div>
            <button 
              onClick={!isExtended ? handleExpand : handleBackToCore} 
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded transition-colors ml-2 flex-shrink-0"
            >
              <ArrowForwardRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default output;