import { FaWhatsapp } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";

export default function FloatingButtons({ onChatClick }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">

      <a
        href="https://wa.me/916203821917"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <FaWhatsapp
          className="text-[#25D366]"
          size={36}
        />
      </a>

      <button
        onClick={onChatClick}
        className="w-16 h-16 rounded-full bg-[#F5A623] shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <BsRobot
          className="text-white"
          size={30}
        />
      </button>

    </div>
  );
}