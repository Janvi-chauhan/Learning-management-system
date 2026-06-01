import previewImg from "../../assets/course/dsa_Python.jpeg";

export default function CoursePreviewCard() {
  const brochureLink="https://drive.google.com/file/d/1ek89Kv91GTwrbMmeczeP7xK_u_cxSSyB/view?usp=sharing"
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
          src={previewImg}
          alt="Course Preview"
          className="w-full h-[180px] object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow">
            ▶
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between text-sm font-semibold border-b pb-3">
          <span className="border-b-2 border-black">Personal</span>
          <span className="text-gray-400">Teams</span>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          This professional course includes placement assistance and real-world projects.
        </p>

        <button className="mt-5 w-full py-3 bg-red-600 text-white font-bold">
          Buy Now
        </button>

        {brochureLink && (
          <a
            href={brochureLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-3 border border-red-600 text-red-600 font-semibold flex justify-center items-center hover:bg-red-50 transition"
          >
            Download Brochure
          </a>
        )}
      </div>
    </div>
  );
}