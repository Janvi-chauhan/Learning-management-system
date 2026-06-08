import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  Pencil,
  BookOpen,
  Award,
  Clock3,
  Bell,
  MessageCircleMore,
  CircleAlert,
  CheckCircle2,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { motion } from "framer-motion";

export default function Profile({
  role = "student",
}) {
const [loggedInUser, setLoggedInUser] = useState(null);

useEffect(() => {
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const res = await api.get("/user");

    console.log("Current User:", res.data);

    setLoggedInUser(res.data.user);
  } catch (error) {
    console.log(error);
  }
};
  // ================= PROFILE DATA =================

  const profileData = {
    student: {
      name: "Tinkesh Deshmukh",

      role: "Student",

      department:
        "Computer Science Engineering",

      email: "tinkesh@example.com",

      phone: "+91 9876543210",

      location: "Pune, Maharashtra",

      joined: "Aug 2023",

      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

      stats: [
        {
          title: "Courses",
          value: "08",

          icon: BookOpen,

          color:
            "bg-orange-100 text-orange-600",
        },

        {
          title: "Certificates",
          value: "12",

          icon: Award,

          color:
            "bg-emerald-100 text-emerald-600",
        },

        {
          title: "Attendance",
          value: "92%",

          icon: CalendarDays,

          color:
            "bg-sky-100 text-sky-600",
        },
      ],

      notifications: [
        {
          title:
            "Live class starts in 30 minutes",

          time: "10 mins ago",

          type: "alert",
        },

        {
          title:
            "Assignment reviewed by Rahul Sharma",

          time: "1 hour ago",

          type: "success",
        },

        {
          title:
            "New doubt answer received",

          time: "Today",

          type: "message",
        },
      ],

      queries: [
        {
          student:
            "Tinkesh Deshmukh",

          message:
            "Can you explain JWT authentication once again?",

          time: "15 mins ago",

          status: "Answered",
        },

        {
          student:
            "Tinkesh Deshmukh",

          message:
            "Will tomorrow's live session be recorded?",

          time: "2 hours ago",

          status: "Pending",
        },
      ],
    },
    

    // ================= TEACHER =================

    teacher: {
      name: "Rahul Sharma",

      role: "Teacher",

      department:
        "Full Stack Development",

      email: "rahul@example.com",

      phone: "+91 9988776655",

      location: "Mumbai, Maharashtra",

      joined: "Jan 2021",

      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

      stats: [
        {
          title: "Courses",
          value: "05",

          icon: BookOpen,

          color:
            "bg-orange-100 text-orange-600",
        },

        {
          title: "Students",
          value: "320",

          icon: GraduationCap,

          color:
            "bg-violet-100 text-violet-600",
        },

        {
          title: "Live Classes",
          value: "14",

          icon: Video,

          color:
            "bg-rose-100 text-rose-600",
        },
      ],

      notifications: [
        {
          title:
            "12 new assignment submissions",

          time: "30 mins ago",

          type: "success",
        },

        {
          title:
            "New question raised by students",

          time: "1 hour ago",

          type: "message",
        },

        {
          title:
            "Live class scheduled for tomorrow",

          time: "Today",

          type: "alert",
        },
      ],

      queries: [
        {
          student: "Aman Gupta",

          message:
            "Can you upload MongoDB revision notes?",

          time: "25 mins ago",

          status: "Pending",
        },

        {
          student: "Priya Verma",

          message:
            "Can we get an extra class for authentication?",

          time: "1 hour ago",

          status: "Answered",
        },

        {
          student: "Rohan Patil",

          message:
            "Facing issue in assignment submission.",

          time: "Today",

          status: "Pending",
        },
      ],
    },
  };

  const user = profileData[role];

  const displayUser = loggedInUser
  ? {
      ...user,
      name: loggedInUser.name,
      email:loggedInUser.email,
      role: loggedInUser.role,
    }
  : user;
  // ================= ICON FUNCTION =================

  const getNotificationIcon = (
    type
  ) => {
    if (type === "success")
      return (
        <CheckCircle2
          size={18}
        />
      );

    if (type === "message")
      return (
        <MessageCircleMore
          size={18}
        />
      );

    return (
      <CircleAlert size={18} />
    );
  };

  const getNotificationStyle = (
    type
  ) => {
    if (type === "success")
      return "bg-emerald-100 text-emerald-600";

    if (type === "message")
      return "bg-violet-100 text-violet-600";

    return "bg-orange-100 text-orange-600";
  };

  return (
    <div
      className="
        min-h-screen
        w-full

        bg-gradient-to-br
        from-[#f8fafc]
        via-[#f9fafb]
        to-[#eef2ff]

        px-6
        py-7
      "
    >
      {/* Container */}

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            mb-8

            flex
            items-center
            justify-between
          "
        >
          <div>
            {/* Label */}

            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-white/70
                backdrop-blur-xl

                border
                border-white/80
              "
            >
              <div
                className="
                  w-2
                  h-2

                  rounded-full

                  bg-orange-500
                "
              />

              <span
                className="
                  text-sm
                  font-medium

                  text-slate-600
                "
              >
                Profile Workspace
              </span>
            </div>

            {/* Title */}

            <h1
              className="
                mt-5

                text-5xl
                font-bold
                tracking-tight

                text-slate-800
              "
            >
              Profile
            </h1>

            {/* Subtitle */}

            <p
              className="
                text-slate-500
                mt-3
                text-lg
              "
            >
              Manage profile,
              notifications, and
              communication.
            </p>
          </div>

          {/* Edit */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-slate-900
              hover:bg-black

              text-white
              font-medium

              transition-all
            "
          >
            <Pencil size={18} />

            Edit Profile
          </motion.button>
        </div>

        {/* ================= LAYOUT ================= */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3

            gap-6
          "
        >
          {/* ================= LEFT ================= */}

          <div className="space-y-6">
            {/* Profile Card */}

            <motion.div
              whileHover={{
                y: -3,
              }}
              className="
                rounded-[30px]

                border
                border-white/80

                bg-white/75
                backdrop-blur-2xl

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                p-6
              "
            >
              {/* Image */}

              <div
                className="
                  flex
                  flex-col
                  items-center

                  text-center
                "
              >
                <img
                  src={displayUser.image}
                  alt={displayUser.name}
                  className="
                    w-32
                    h-32

                    rounded-full

                    object-cover

                    border-4
                    border-white

                    shadow-lg
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-bold

                    text-slate-800

                    mt-5
                  "
                >
                  {user.name}
                </h2>

                <p
                  className="
                    text-slate-500
                    mt-1
                  "
                >
                  {displayUser.role}
                </p>

                <div
                  className="
                    mt-4

                    px-4
                    py-2

                    rounded-full

                    bg-orange-100
                    text-orange-600

                    text-sm
                    font-semibold
                  "
                >
                  {user.department}
                </div>
              </div>

              {/* Contact */}

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",

                    value: displayUser.email,
                  },

                  {
                    icon: Phone,
                    label: "Phone",

                    value: displayUser.phone,
                  },

                  {
                    icon: MapPin,
                    label: "Location",

                    value:
                      user.location,
                  },
                ].map(
                  (
                    item,
                    index
                  ) => {
                    const Icon =
                      item.icon;

                    return (
                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >
                        <div
                          className="
                            w-12
                            h-12

                            rounded-2xl

                            bg-slate-100
                            text-slate-600

                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Icon
                            size={20}
                          />
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              text-slate-500
                            "
                          >
                            {
                              item.label
                            }
                          </p>

                          <h3
                            className="
                              font-medium
                              text-slate-800
                            "
                          >
                            {
                              item.value
                            }
                          </h3>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </motion.div>

            {/* Notifications */}

            <motion.div
              whileHover={{
                y: -3,
              }}
              className="
                rounded-[30px]

                border
                border-white/80

                bg-white/75
                backdrop-blur-2xl

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3

                  mb-6
                "
              >
                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-orange-100
                    text-orange-600

                    flex
                    items-center
                    justify-center
                  "
                >
                  <Bell size={22} />
                </div>

                <div>
                  <h2
                    className="
                      text-2xl
                      font-bold

                      text-slate-800
                    "
                  >
                    Notifications
                  </h2>

                  <p
                    className="
                      text-slate-500
                    "
                  >
                    Recent updates
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {user.notifications.map(
                  (
                    notification,
                    index
                  ) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        x: 3,
                      }}
                      className="
                        flex
                        items-start
                        gap-4

                        p-4

                        rounded-2xl

                        bg-slate-50/80
                      "
                    >
                      <div
                        className={`
                          w-10
                          h-10

                          rounded-xl

                          flex
                          items-center
                          justify-center

                          ${getNotificationStyle(
                            notification.type
                          )}
                        `}
                      >
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                      <div>
                        <h3
                          className="
                            font-medium
                            text-slate-800
                          "
                        >
                          {
                            notification.title
                          }
                        </h3>

                        <p
                          className="
                            text-sm
                            text-slate-500
                            mt-1
                          "
                        >
                          {
                            notification.time
                          }
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="xl:col-span-2 space-y-6">
            {/* Stats */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3

                gap-5
              "
            >
              {user.stats.map(
                (stat, index) => {
                  const Icon =
                    stat.icon;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{
                        y: -3,
                      }}
                      className="
                        rounded-[28px]

                        border
                        border-white/80

                        bg-white/75
                        backdrop-blur-2xl

                        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                        p-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div>
                          <p
                            className="
                              text-slate-500
                              text-sm
                            "
                          >
                            {
                              stat.title
                            }
                          </p>

                          <h2
                            className="
                              text-3xl
                              font-bold

                              text-slate-800

                              mt-2
                            "
                          >
                            {
                              stat.value
                            }
                          </h2>
                        </div>

                        <div
                          className={`
                            w-14
                            h-14

                            rounded-2xl

                            flex
                            items-center
                            justify-center

                            ${stat.color}
                          `}
                        >
                          <Icon
                            size={24}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>

            {/* About */}

            <motion.div
              whileHover={{
                y: -3,
              }}
              className="
                rounded-[30px]

                border
                border-white/80

                bg-white/75
                backdrop-blur-2xl

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                p-6
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold

                  text-slate-800

                  mb-5
                "
              >
                About
              </h2>

              <p
                className="
                  text-slate-600
                  leading-8
                "
              >
                {role ===
                "student"
                  ? "Passionate learner focused on full-stack development, AI systems, and scalable web technologies with strong interest in live cohort learning."
                  : "Experienced educator specializing in live mentoring, interactive teaching, and modern software engineering technologies."}
              </p>
            </motion.div>

            {/* Student Queries */}

            <motion.div
              whileHover={{
                y: -3,
              }}
              className="
                rounded-[30px]

                border
                border-white/80

                bg-white/75
                backdrop-blur-2xl

                shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                p-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-6
                "
              >
                <div>
                  <h2
                    className="
                      text-2xl
                      font-bold

                      text-slate-800
                    "
                  >
                    {role ===
                    "student"
                      ? "My Queries"
                      : "Student Queries"}
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-1
                    "
                  >
                    Better communication
                    between students and
                    teachers
                  </p>
                </div>

                <button
                  className="
                    px-5
                    py-2.5

                    rounded-2xl

                    bg-slate-900
                    hover:bg-black

                    text-white
                    text-sm
                    font-medium

                    transition-all
                  "
                >
                  {role ===
                  "student"
                    ? "Raise Query"
                    : "View All"}
                </button>
              </div>

              <div className="space-y-4">
                {user.queries.map(
                  (
                    query,
                    index
                  ) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        y: -2,
                      }}
                      className="
                        rounded-3xl

                        border
                        border-slate-100

                        bg-slate-50/70

                        p-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between

                          gap-5
                        "
                      >
                        <div>
                          <div
                            className="
                              flex
                              items-center
                              gap-2

                              mb-2
                            "
                          >
                            <div
                              className="
                                w-9
                                h-9

                                rounded-full

                                bg-orange-100
                                text-orange-600

                                flex
                                items-center
                                justify-center

                                font-semibold
                                text-sm
                              "
                            >
                              {query.student.charAt(
                                0
                              )}
                            </div>

                            <div>
                              <h3
                                className="
                                  font-semibold
                                  text-slate-800
                                "
                              >
                                {
                                  query.student
                                }
                              </h3>

                              <p
                                className="
                                  text-xs
                                  text-slate-500
                                "
                              >
                                {
                                  query.time
                                }
                              </p>
                            </div>
                          </div>

                          <p
                            className="
                              text-slate-600
                              leading-7
                            "
                          >
                            {
                              query.message
                            }
                          </p>
                        </div>

                        <span
                          className={`
                            px-4
                            py-2

                            rounded-full

                            text-sm
                            font-semibold

                            whitespace-nowrap

                            ${
                              query.status ===
                              "Answered"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-orange-100 text-orange-600"
                            }
                          `}
                        >
                          {query.status}
                        </span>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}