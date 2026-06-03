import { motion } from "framer-motion";

const tabs = [
  { label: "All Courses", value: "all" },
  { label: "Job Ready", value: "job" },
  { label: "Upcoming", value: "upcoming" },
];

export default function CourseTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-4 py-12">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`relative px-6 py-2 rounded-full font-semibold transition
            ${activeTab === tab.value ? "text-white" : "text-gray-700"}`}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="tab"
              className="absolute inset-0 bg-red-600 rounded-full"
              transition={{ type: "spring", stiffness: 300 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
