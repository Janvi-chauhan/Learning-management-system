export default function CompaniesHiring() {
  return (
    <section className="bg-[#fffaf5] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ✅ LEFT: COMPANY LOGOS */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 place-items-center">

            {[
              "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tata_Consultancy_Services_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
              "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/0/08/Cognizant_logo_2022.svg",
              "https://upload.wikimedia.org/wikipedia/commons/3/3b/Capgemini_2017_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/6/6f/HCL_Technologies_logo.svg",
            ].map((logo, i) => (
              <div
                key={i}
                className="
                  bg-white p-4 w-full h-[70px]
                  flex items-center justify-center
                  shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                  hover:scale-110 transition
                "
              >
                <img
                  src={logo}
                  alt="company"
                  className="max-h-full object-contain"
                />
              </div>
            ))}

          </div>

          {/* ✅ RIGHT: CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans leading-tight">
              Top <span className="text-red-600">Companies Hiring</span> <br />
              Our Students
            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed">
              Our training programs are designed with industry needs in mind.
              That’s why our students are getting placed in top MNCs and
              fast-growing startups across India.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700 font-medium">
              <li>✅ Dedicated Placement Support</li>
              <li>✅ Resume & Interview Preparation</li>
              <li>✅ Live Industry Projects</li>
              <li>✅ Mock Interviews by Experts</li>
            </ul>

            <button
              className="
                mt-8 px-9 py-4
                bg-gradient-to-r from-red-600 to-red-700
                text-white font-bold font-sans rounded-xl
                shadow-xl shadow-red-300
                hover:scale-105 transition
              "
            >
              Enroll Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
