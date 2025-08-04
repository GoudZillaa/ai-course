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
              <div className="subtitle text-[1rem] font-medium leading-none text-gray-400">
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
                <div className="content_explanation px-4">
                  <strong className="text-gray-600">explanation:</strong> {concept.explanation}
                </div>
                <div className="content_video_suggestions flex justify-between my-4 px-4">
                  {videoData[index]?.map((video, i) => (
                    <a key={i} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
                      <img
                        className="w-48 aspect-video object-cover rounded-lg"
                        src={video.thumbnail}
                        alt={video.title}
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="input_container absolute bottom-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl w-182 h-15 text-gray-600 font-bold flex justify-between px-2 items-center">
            <div className="flex justify-center text-xl">
              {isExtended ? "Wanna go back?" : "Wanna dive deep?"}
            </div>
            <button
              onClick={!isExtended ? handleExpand : handleBackToCore}
              className="bg-gray-300 p-2 rounded"
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
