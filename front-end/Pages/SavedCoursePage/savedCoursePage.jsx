import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const SavedCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isExtended, setIsExtended] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);
      } catch (err) {
        setError("Failed to load course");
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  if (error) {
    return <div className="text-red-600 font-semibold text-center mt-10">{error}</div>;
  }

  if (!course) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const courseData = isExtended ? course.extendedConcepts : course.coreConcepts;
  const videoData = isExtended ? course.extendedVideoResults : course.videoResults;

  const handleExpand = () => setIsExtended(true);
  const handleBackToCore = () => setIsExtended(false);

  return (
    <div className="Output relative w-full h-full py-8 flex dark:bg-gray-800 justify-center items-center overflow-x-hidden">
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

export default SavedCoursePage;