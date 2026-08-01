import { useEffect, useRef, useState } from "react";
import { IoClose, IoSend, IoTrashOutline } from "react-icons/io5";
import { sendMessage } from "../services/chatApi";

export default function ChatBot({ onClose }) {
  const defaultMessages = [
  {
    sender: "bot",
    text: "👋 Hello!\n\nWelcome to Creative Programming Classes.\n\nHow can I help you today?",
  },
];
 const [messages, setMessages] = useState(defaultMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(question);

      // Small delay so typing animation is visible
      await new Promise((resolve) => setTimeout(resolve, 900));

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      await new Promise((resolve) => setTimeout(resolve, 900));

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const clearChat = () => {
  setMessages(defaultMessages);
  setInput("");
  setLoading(false);
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-5 z-[9999] animate-[fadeIn_.25s]">
      <div
        className="
          w-[340px]
          sm:w-[360px]
          h-[520px]
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-[0_15px_40px_rgba(0,0,0,.30)]
          flex
          flex-col
        "
      >
        {/* Header */}
        <div className="bg-[#0D4C92] text-white px-5 py-4 flex justify-between items-center">
  <div>
    <h2 className="font-semibold text-lg">
      Creative Programming Classes
    </h2>

    <p className="text-xs text-white/80">
      AI Assistant
    </p>
  </div>

  <div className="flex items-center gap-2">
    {/* Clear Chat */}
    <button
      onClick={clearChat}
      title="Clear Chat"
      className="
        w-9
        h-9
        rounded-full
        hover:bg-white/20
        transition
        flex
        items-center
        justify-center
      "
    >
      <IoTrashOutline size={20} />
    </button>

    {/* Close */}
    <button
      onClick={onClose}
      className="
        w-9
        h-9
        rounded-full
        hover:bg-white/20
        transition
        flex
        items-center
        justify-center
      "
    >
      <IoClose size={24} />
    </button>
  </div>
</div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow whitespace-pre-line ${
                msg.sender === "user"
                  ? "self-end bg-blue-700 text-white rounded-br-sm"
                  : "self-start bg-white text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* AI Typing Animation */}
          {loading && (
            <div className="self-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow flex items-center gap-2">
                <span className="text-lg">🤖</span>

                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>

                  <span
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>

                  <span
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="border-t p-3 flex items-center bg-white">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything about our courses..."
            className="
              flex-1
              border
              rounded-full
              px-4
              py-3
              outline-none
              focus:border-blue-600
              transition
            "
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              ml-3
              w-12
              h-12
              rounded-full
              bg-blue-700
              text-white
              flex
              items-center
              justify-center
              hover:bg-blue-800
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <IoSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}