import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const generating = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = searchParams.get("topic");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/core`, { topic });
        const courseData = response.data;

        const videoCache = {};

        const videoResults = await Promise.all(
          courseData.coreConcepts.map(async (concept) => {
            const query = concept.videoSearchQuery;

            // Check if already fetched
            if (videoCache[query]) return videoCache[query];

            try {
              const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/videos`, { query });
              videoCache[query] = res.data;
              return res.data;
            } catch (err) {
              console.warn(`YouTube API failed for "${query}", continuing without videos.`);
              return []; 
            }
          })
        );

        navigate("/output", {
          state: {
            topic,
            course: courseData,
            videoResults,
            mode: "core",
          },
        });
      } catch (err) {
        console.error("Error generating course:", err);
      }
    };
    fetchData();
  }, [topic, navigate]);

  return (
    <div className="Generate w-full h-full">
      <div className="flex h-full flex-col items-center justify-center text-black font-sans px-4">
        <h1 className="text-xl sm:text-2xl font-medium text-center">
          Generating your personalized course
          <span className="inline-block animate-dots ml-1">.</span>
        </h1>

        <div className="w-full max-w-md mt-12">
          <div className="h-3 bg-gradient-to-r from-[#444] via-[#999] to-[#444] bg-[length:200%_100%] animate-shimmer rounded-full" />
        </div>

        <p className="mt-10 text-sm text-[#888] text-center max-w-md">
          “The best investment you can make is in yourself.” – Warren Buffett
        </p>

        {/* Tailwind Animations */}
        <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.8s infinite linear;
        }

        @keyframes dots {
          0% { content: ''; }
          33% { content: '.'; }
          66% { content: '..'; }
          100% { content: '...'; }
        }

        .animate-dots::after {
          display: inline-block;
          content: '';
          animation: dots 1.5s steps(3, end) infinite;
        }
      `}</style>
      </div>
    </div>
  );
};

export default generating;
