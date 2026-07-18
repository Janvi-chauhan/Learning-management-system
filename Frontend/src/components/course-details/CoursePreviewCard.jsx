import { useState} from "react";
import EnrollmentModal from "../EnrollmentModal";

export default function CoursePreviewCard({
  course,
}) {
  const [showEnrollModal,setShowEnrollModal]= useState(false);
  const user = JSON.parse(
  localStorage.getItem("user")
);
<EnrollmentModal
  course={course}
  student={user}
  onClose={() =>
    setShowEnrollModal(false)
  }
/>
console.log(user);

  return (
    

    <div
      className="
        hidden lg:block
        fixed
        top-50
        right-28
        w-[400px]
        bg-white
        shadow-2xl
        border
        z-20
      "
    >

      {/* IMAGE */}

      <div className="relative">

        <img
          src={
            course?.thumbnail ||
            "https://via.placeholder.com/400x180"
          }
          alt={course?.title}
          className="w-full h-[180px] object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">

          {course?.preview_video && (

            <a
              href={course.preview_video}
              target="_blank"
              rel="noreferrer"
              className="
                bg-white
                w-12 h-12
                rounded-full
                flex
                items-center
                justify-center
                shadow
              "
            >
              ▶
            </a>

          )}

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="flex justify-between text-sm font-semibold border-b pb-3">

          <span className="border-b-2 border-black">
            Personal
          </span>

          <span className="text-gray-400">
            Teams
          </span>

        </div>

        <p className="text-sm text-gray-600 mt-4">

          {course?.description ||

            "This professional course includes placement assistance and real-world projects."}

        </p>

        <button
          onClick={() =>
           setShowEnrollModal(true)
          }
          className="
            mt-5
            w-full
            py-3
            bg-red-600
            text-white
            font-bold
          "
        >
          Buy Now
        </button>

        {course?.brochure && (

          <a
            href={course.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-3
              w-full
              py-3
              border
              border-red-600
              text-red-600
              font-semibold
              flex
              justify-center
              items-center
              hover:bg-red-50
              transition
            "
          >
            Download Brochure
          </a>

        )}

      </div>
     {
showEnrollModal && (

<EnrollmentModal

course={course}

student={user}

onClose={()=>
setShowEnrollModal(false)
}

/>

)
}
    </div>

    

  );
}