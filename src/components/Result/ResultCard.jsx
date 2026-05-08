export default function ResultCard({ data }) {
  return (
    <div className="
      bg-white
      overflow-hidden
      transition-all duration-300
      hover:-translate-y-1
    ">

      {/* IMAGE */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="py-5 px-4 text-center">

        {/* NAME */}
        <h3 className="text-[18px] font-bold text-gray-900">
          {data.name}
        </h3>

        {/* COMPANY LOGO OR TEXT */}
        <div className="mt-2 flex justify-center">
          {data.logo ? (
            <img
              src={data.logo}
              alt="logo"
              className="h-8 object-contain"
            />
          ) : (
            <p className="font-bold text-gray-800">
              {data.company}
            </p>
          )}
        </div>

        {/* DESIGNATION */}
        <p className="mt-2 text-[14px] font-semibold text-gray-700">
          {data.designation}
        </p>

        {/* BATCH */}
        <p className="text-gray-500 text-sm mt-1">
          Batch : {data.batch}
        </p>

      </div>

    </div>
  );
}
