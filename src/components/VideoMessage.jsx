export default function VideoMessage() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ✅ LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Students – Ready to{" "}
              <span className="text-red-600">future-proof</span> your career?
            </h2>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Watch this video to see why coding is the skill you need.
              We’ll show you the amazing opportunities that open up when
              you learn to code — from top tech jobs to complete career guidance.
            </p>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Don’t miss out — start your coding journey with{" "}
              <span className="font-semibold text-black">Programming Classes</span>{" "}
              and build a successful future.
            </p>

            <button
              className="
                mt-8 px-8 py-4 rounded-xl
                bg-red-600 text-white font-bold text-lg
                shadow-lg shadow-red-300
                hover:bg-red-700 hover:scale-105 transition-all
              "
            >
              Join New Batch
            </button>
          </div>

          {/* ✅ RIGHT VIDEO */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">

            {/* 16:9 responsive video */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/T3Dz9VZ5rbY"
                title="Programming Classes Message"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
