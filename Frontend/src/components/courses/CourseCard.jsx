import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div
      className="
        bg-white
        border border-gray-300
        shadow-sm
        hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-60 w-full">
        <img src={
    course.thumbnail ||
    "https://via.placeholder.com/400x250"
  }
          alt={course.title}
          className="h-full w-full object-cover object-[15%_center]"
        />

        {/* BADGE */}
        {course.badge && (
          <span
            className="
              absolute top-3 left-3
              bg-red-600
              text-white
              text-xs
              font-bold
              px-3 py-1
            "
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

         {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <h3 className="text-lg font-extrabold mb-1 text-black">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {course.tech}
        </p>

        <button
  onClick={() => navigate(`/courses/${course.id}`)}
  className="mt-4 w-full bg-red-600 text-white py-3 font-semibold"
>
  View Details
</button>
      </div>
    </div>
  );
}
