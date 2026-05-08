import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/20">

          {/* LOGO + ADDRESS */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Programming Classes" className="w-14 h-14" />
              <h3 className="text-xl font-bold">Programming Classes</h3>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Best IT Training Institute in Patna <br />
              3rd Floor, Jagdamba Tower, Sahdeo Mahto Marg, <br />
              Boring Road, Patna – Bihar (800001)
            </p>

            <p className="mt-4 text-sm text-gray-300">
              📞 7488435045 <br />
              ✉ progclasses@gmail.com
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Courses</li>
              <li className="hover:text-white cursor-pointer">New Batch</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* PROGRAMS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white cursor-pointer">Full Stack Development</li>
              <li className="hover:text-white cursor-pointer">Backend with Java</li>
              <li className="hover:text-white cursor-pointer">Python & Data Analysis</li>
              <li className="hover:text-white cursor-pointer">Frontend Development</li>
              <li className="hover:text-white cursor-pointer">Internship Programs</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-4">
              Enter your email to get updates about new batches & offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="
                  w-full px-4 py-2
                  text-white bg-transparent
                  border-2 border-white
                  placeholder-gray-300
                  outline-none
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/40
                  transition
                "
              />
               <button className="bg-red-600 px-5 py-2 font-semibold hover:bg-red-700 transition">
                  Send
                 </button>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              <span className="w-9 h-9 border border-white flex items-center justify-center rounded-full hover:bg-white hover:text-black cursor-pointer transition">
                f
              </span>
              <span className="w-9 h-9 border border-white flex items-center justify-center rounded-full hover:bg-white hover:text-black cursor-pointer transition">
                t
              </span>
              <span className="w-9 h-9 border border-white flex items-center justify-center rounded-full hover:bg-white hover:text-black cursor-pointer transition">
                in
              </span>
              <span className="w-9 h-9 border border-white flex items-center justify-center rounded-full hover:bg-white hover:text-black cursor-pointer transition">
                y
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Programming Classes. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
