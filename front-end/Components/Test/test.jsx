import React, { useEffect, useState } from "react";
import "../../src/App.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import axios from "axios";

// Accept `topic` as prop or use from context/state/router
const Output = ({ topic = "javascript" }) => {
  const [mode, setMode] = useState("core");
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoreConcepts();
  }, []);

  const fetchCoreConcepts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/core", { topic });
      const coreConcepts = await Promise.all(
        data.coreConcepts.map(async (concept) => {
          const videoRes = await axios.post("http://localhost:3000/api/videos", {
            query: concept.videoSearchQuery,
          });
          return { ...concept, videos: videoRes.data };
        })
      );
      setCourseData({ courseTitle: data.courseTitle, coreConcepts });
    } catch (err) {
      console.error("Error loading core concepts", err);
    }
    setLoading(false);
  };

  const fetchExtendedConcepts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/extended", { topic });
      const extendedConcepts = await Promise.all(
        data.extendedConcepts.map(async (concept) => {
          const videoRes = await axios.post("http://localhost:3000/api/videos", {
            query: concept.videoSearchQuery,
          });
          return { ...concept, videos: videoRes.data };
        })
      );
      setCourseData((prev) => ({ ...prev, extendedConcepts }));
      setMode("extended");
    } catch (err) {
      console.error("Error loading extended concepts", err);
    }
    setLoading(false);
  };

  const conceptsToRender = mode === "core"
    ? courseData?.coreConcepts
    : courseData?.extendedConcepts;

  return (
    <div className="Output relative w-full h-full flex justify-center items-center">
      <div className="content_container w-180 h-full pt-4 pb-8">
        <div className="main w-full h-full flex flex-col">
          <div className="upper_block">
            <div className="title_container">
              <div className="title">
                <h3>
                  {mode === "core"
                    ? "Here's the core concepts you need to work on first."
                    : "Here's what to learn next to master the topic."}
                </h3>
              </div>
              <div className="subtitle text-[1rem] font-medium leading-none text-gray-400">
                {mode === "core"
                  ? "Make sure to practise all these concepts to create a solid understanding"
                  : "These extended topics will deepen your knowledge and skill"}
              </div>
            </div>
            <br />
          </div>

          <div className="course_content overflow-y-auto flex-1 py-6">
            {loading ? (
              <div className="text-center text-lg font-semibold">Loading...</div>
            ) : (
              conceptsToRender?.map((concept, idx) => (
                <div className="content_block mb-6" key={idx}>
                  <div className="content_title font-bold text-[1.2rem]">
                    {idx + 1}. {concept.title}
                  </div>
                  <div className="content_explanation px-4">
                    <strong className="text-gray-600">Explanation:</strong>{" "}
                    {concept.explanation}
                  </div>
                  <div className="content_video_suggestions flex justify-between my-4 px-4">
                    {concept.videos?.map((vid, i) => (
                      <a
                        key={i}
                        href={`https://www.youtube.com/watch?v=${vid.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="content_img bg-black w-48 rounded-lg h-27 overflow-hidden"
                      >
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {mode === "core" && (
            <div className="input_container absolute bottom-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl w-182 h-15 text-gray-600 font-bold flex justify-between px-2 items-center">
              <div className="flex justify-center text-xl">Wanna dive deep?</div>
              <button className="bg-gray-300 p-2 rounded" onClick={fetchExtendedConcepts}>
                <ArrowForwardRoundedIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Output;
