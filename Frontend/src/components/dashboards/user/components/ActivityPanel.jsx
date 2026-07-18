import {
  Clock,
  BookOpen,
  ClipboardCheck,
  Users,
  CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../../services/api";

import { motion } from "framer-motion";

  const ActivityPanel = ({ role }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  

  const fetchActivities = async () => {

    try {

      const response =
        await api.get(
          role === "student"
            ? "/student/activities"
            : "/teacher/activities"
        );

      setActivities(
        response.data.data || []
      );

    } catch (error) {

      console.log(
        "Activity Error:",
        error
      );

    }
  };

  useEffect(() => {

    fetchActivities();

  }, [role]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        relative
        overflow-hidden

        rounded-[32px]

        border
        border-white/80

        bg-white/75
        backdrop-blur-2xl

        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

        p-6
      "
    >
      {/* Ambient Background Glow */}

      <div
        className="
          absolute
          top-0
          right-0

          w-52
          h-52

          rounded-full

          bg-slate-200/20

          blur-3xl
        "
      />

      {/* ================= HEADER ================= */}

      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-between

          mb-8
        "
      >
        <div>
          {/* Label */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              bg-slate-100
            "
          >
            <div
              className="
                w-2
                h-2

                rounded-full

                bg-red-500
              "
            />

            <span
              className="
                text-xs
                font-semibold

                text-slate-600
              "
            >
              Live Updates
            </span>
          </div>

          {/* Title */}

          <h2
            className="
              mt-4

              text-3xl
              font-bold

              text-slate-800
            "
          >
            Recent Activity
          </h2>

          {/* Subtitle */}

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Latest dashboard updates
          </p>
        </div>

        {/* Button */}

        <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  onClick={() => navigate("/teacher/queries")}
  className="
    px-5
    py-2.5
    rounded-2xl
    bg-slate-900
    text-white
    text-sm
    font-medium
    shadow-lg
    shadow-slate-900/10
    transition-all
    duration-200
  "
>
  View All
</motion.button>
      </div>

      {/* ================= ACTIVITY LIST ================= */}

      <div
        className="
          relative
          z-10

          space-y-4
        "
      >
        {activities.length === 0 ? (

  <div
    className="
      text-center
      py-10
      text-slate-500
    "
  >
    No Recent Activities Found
  </div>

) : activities.map(
  (activity, index) => {

    const Icon =
      activity.type === "assignment"
        ? ClipboardCheck
        : activity.type === "course"
        ? BookOpen
        : activity.type === "project"
        ? Clock
        : activity.type === "student"
        ? Users
        : CalendarDays;

    return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                  duration: 0.25,
                }}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                className="
                  flex
                  items-center
                  justify-between

                  rounded-3xl

                  border
                  border-white/70

                  bg-white/60

                  px-5
                  py-4

                  transition-all
                  duration-200

                  hover:shadow-md
                "
              >
                {/* LEFT */}

                <div className="flex items-center gap-4">
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      rotate: 5,
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="
                    w-14
                    h-14

                     rounded-2xl
                   
                     flex
                     items-center
                     justify-center
                   
                   bg-red-100
                   text-red-600
                   "
                  >
                    <Icon size={24} />
                  </motion.div>

                  {/* TEXT */}

                  <div>
                    <h3
                      className="
                        text-[16px]
                        font-semibold

                        text-slate-800
                      "
                    >
                      {activity.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-slate-500

                        mt-1
                      "
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  {/* Status */}

                  <span
                    className="
                      hidden
                      md:flex

                      px-3
                      py-1.5

                      rounded-full

                      bg-slate-100

                      text-xs
                      font-semibold

                      text-slate-600
                    "
                  >
                    {activity.status}
                  </span>

                  

                  {/* <motion.div
                    animate={{
                      scale: [
                        1,
                        1.2,
                        1,
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="
                      w-3
                      h-3

                      rounded-full

                      bg-emerald-500
                    "
                  /> */}
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </motion.div>
  );
};

export default ActivityPanel;