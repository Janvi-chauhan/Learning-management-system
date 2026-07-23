import { useRef, useEffect } from "react";
import api from "../../../../../services/api";
import {
  PlayCircle,
  Clock,
  Calendar,
  User,
} from "lucide-react";

export default function VideoPlayer({ lesson }) {
  const videoRef = useRef(null);

  const videoUrl = lesson?.video || "";

  // Save progress every 10 seconds
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let lastSaved = 0;

    const handleTimeUpdate = async () => {
      if (video.currentTime - lastSaved >= 10) {
        lastSaved = video.currentTime;

        try {
          await api.post("/student/lesson/progress", {
            lesson_id: lesson.id,
            watched_seconds: Math.floor(video.currentTime),
          });
        } catch (err) {
          console.log(err);
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
    };
  }, [lesson]);

  // Resume video from last position
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const resume = () => {
      if (lesson?.watched_seconds) {
        video.currentTime = lesson.watched_seconds;
      }
    };

    video.addEventListener("loadedmetadata", resume);

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        resume
      );
    };
  }, [lesson]);

  const getVideoPlayer = () => {
    // YouTube
    if (
      videoUrl.includes("youtube.com") ||
      videoUrl.includes("youtu.be")
    ) {
      let embedUrl = videoUrl;

      if (videoUrl.includes("youtu.be/")) {
        const id = videoUrl
          .split("youtu.be/")[1]
          .split("?")[0];

        embedUrl = `https://www.youtube.com/embed/${id}`;
      }

      if (videoUrl.includes("watch?v=")) {
        const id = videoUrl
          .split("watch?v=")[1]
          .split("&")[0];

        embedUrl = `https://www.youtube.com/embed/${id}`;
      }

      return (
        <iframe
          src={embedUrl}
          title={lesson.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Google Drive
    if (videoUrl.includes("drive.google.com")) {
      const match = videoUrl.match(/\/d\/(.*?)\//);

      if (match) {
        const fileId = match[1];

        return (
          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview`}
            title={lesson.title}
            className="w-full h-full"
            allow="autoplay"
            allowFullScreen
          />
        );
      }
    }

    // MP4 / Cloudinary
    return (
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />

        Your browser does not support video playback.
      </video>
    );
  };

  return (
    <div
      id="video-player"
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative w-full aspect-video bg-black">
        {getVideoPlayer()}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-3">
          <PlayCircle size={22} />
          <span className="font-semibold">
            Current Lesson
          </span>
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          {lesson.title}
        </h2>

        <p className="text-gray-500 mt-4 leading-7">
          {lesson.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
            <Clock
              size={22}
              className="text-indigo-600"
            />

            <div>
              <p className="text-sm text-gray-500">
                Duration
              </p>

              <h4 className="font-semibold">
                {lesson.duration}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
            <User
              size={22}
              className="text-green-600"
            />

            <div>
              <p className="text-sm text-gray-500">
                Instructor
              </p>

              <h4 className="font-semibold">
                {lesson.module?.course?.mentor_name ||
                  "Instructor"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
            <Calendar
              size={22}
              className="text-orange-600"
            />

            <div>
              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <h4 className="font-semibold">
                {new Date(
                  lesson.updated_at
                ).toLocaleDateString()}
              </h4>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ul className="grid md:grid-cols-2 gap-3">
            {(lesson.module?.course?.learnings || []).map(
              (item, index) => (
                <li
                  key={index}
                  className="bg-indigo-50 rounded-lg px-4 py-3"
                >
                  ✅ {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}