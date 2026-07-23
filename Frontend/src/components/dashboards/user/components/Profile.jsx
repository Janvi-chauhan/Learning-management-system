import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  Pencil,
  BookOpen,
  Award,
  Calendar,
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
const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");
const [loggedInUser, setLoggedInUser] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);
const [profilePic, setProfilePic] = useState(null);
const [queries, setQueries] = useState([]);
const [showAllQueries, setShowAllQueries] = useState(false);

const [selectedQuery, setSelectedQuery] = useState(null);
const [answerText, setAnswerText] = useState("");
const [showAnswerModal, setShowAnswerModal] = useState(false);

const [queryText, setQueryText] = useState("");
const [notifications, setNotifications] = useState([]);
const [showQueryModal, setShowQueryModal] = useState(false);
const [user, setUser] = useState({});
const [profileStats, setProfileStats] = useState({ courses: 0, certificates: 0, attendance: 0});

const [editForm, setEditForm] =
  useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    location: "",
    subject: "",
    experience: "",
  });

useEffect(() => {
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const res = await api.get("/user");

    console.log("Current User:", res.data);

     const userData = res.data.user;
    //  if (userData.image) {
    // setProfilePic(
    //     `${BACKEND_URL}/storage/${userData.image}`
    // );
//}

    // Student Stats
    if (userData.role === "student") {
  const coursesRes = await api.get("/student/courses");
  const assignmentsRes = await api.get("/student/assignments");

  userData.stats = [
    {
      title: "Courses",
      value: coursesRes.data?.data?.length || 0,
      icon: BookOpen,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Assignments",
      value: assignmentsRes.data?.data?.length || 0,
      icon: Award,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Attendance",
      value: `${userData.attendance || 0}%`,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
  ];
}

    // Teacher Stats
    if (userData.role === "teacher") {
  const coursesRes = await api.get("/teacher/courses");
  const queriesRes = await api.get("/teacher/queries");

  // userData.stats = [
  //   {
  //     title: "Courses",
  //     value: coursesRes.data?.data?.length || 0,
  //     icon: BookOpen,
  //     color: "bg-orange-100 text-orange-600",
  //   },
  //   {
  //     title: "Queries",
  //     value: queriesRes.data?.data?.length || 0,
  //     icon: Award,
  //     color: "bg-purple-100 text-purple-600",
  //   },
  //   {
  //     title: "Live Classes",
  //     value: userData.live_classes || 0,
  //     icon: Calendar,
  //     color: "bg-pink-100 text-pink-600",
  //   },
  // ];
}

    setLoggedInUser(userData);
  } catch (error) {
    console.log(error);
  }
};

const openEditModal = () => {
  setEditForm({
    name: displayUser.name || "",
    email: displayUser.email || "",
    phone: displayUser.phone || "",
    location: displayUser.location || "",
    subject: displayUser.subject || "",
    experience: displayUser.experience || "",
    image: null,
  });
  setProfilePic(
    displayUser.image
      ? `${BACKEND_URL}/storage/${displayUser.image}`
      : null
  );

  setShowEditModal(true);
};

const handleEditChange = (e) => {
  setEditForm({
    ...editForm,
    [e.target.name]: e.target.value,
  });
};
 const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setProfilePic(URL.createObjectURL(file));

    setEditForm((prev) => ({
      ...prev,
      image: file,
    }));
  }
};
const updateProfile = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append("email", editForm.email);
    formData.append("phone", editForm.phone);
    formData.append("location", editForm.location);

    if (editForm.subject) {
      formData.append("subject", editForm.subject);
    }

    if (editForm.experience) {
      formData.append("experience", editForm.experience);
    }

    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    // If your Laravel route is PUT
    formData.append("_method", "PUT");

    const endpoint =
      loggedInUser?.role === "teacher"
        ? "/teacher/profile"
        : "/student/profile";

    const res = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data);

    alert("Profile Updated Successfully");

   await fetchUser();

setProfilePic(null);

setShowEditModal(false);
  } catch (error) {
    console.log(error.response?.data || error);
  }
};
const raiseQuery =
async () => {

  try {

    await api.post(
      "/student/queries",
      {
        query: queryText
      }
    );

    alert(
      "Query Raised Successfully"
    );

    setQueryText("");

    setShowQueryModal(
      false
    );

    fetchQueries();

  } catch (error) {

    console.log(error);

  }
};


const fetchQueries = async () => {
  try {

    console.log("Fetching Queries...");

    const response = await api.get(
      "/teacher/queries"
    );

    console.log(
      "Teacher Queries API Response:",
      response.data
    );

    console.log(
      "Teacher Queries Data:",
      response.data.data
    );

    setQueries(response.data.data);

  } catch (error) {

    console.log(
      "Query Error:",
      error
    );

  }
};
useEffect(() => {

  if (role === "teacher") {
    fetchQueries();
  }

}, [role]);

const submitAnswer =
  async () => {

  try {

    await api.put(
      `/teacher/queries/${selectedQuery.id}/answer`,
      {
        answer: answerText,
      }
    );

    await fetchQueries();

    setShowAnswerModal(false);

    setAnswerText("");

    setSelectedQuery(null);

  } catch (error) {

    console.log(error);

  }
};

const answerQuery =
async (id) => {

  const answer =
    prompt(
      "Enter Answer"
    );

  if (!answer) return;

  try {

    await api.put(
      `/teacher/queries/${id}/answer`,
      {
        answer
      }
    );

    fetchQueries();

  } catch (error) {

    console.log(error);

  }
};

const fetchNotifications =
async () => {

  try {

    const response =
      await api.get(
        "/teacher/notifications"
      );

    setNotifications(
      response.data.data
    );

  } catch (error) {

    console.log(error);

  }
};
useEffect(() => {

  fetchQueries();

  fetchNotifications();

}, []);
  // ================= PROFILE DATA =================

  const profileData = {
    student: {
      name: "",

      role: "Student",

      department:
        "Computer Science Engineering",

      email: "",

      phone: "",

      location: "",

      joined: "",

      image:
        null,

      stats: [
        {
          title: "Courses",
          value: profileStats.courses,

          icon: BookOpen,

          color:
            "bg-orange-100 text-orange-600",
        },

        {
          title: "Certificates",
          value: profileStats.certificates,

          icon: Award,

          color:
            "bg-emerald-100 text-emerald-600",
        },

        {
          title: "Attendance",
          value: profileStats.attendance ,

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
      name: "",

      role: "Teacher",

      department:
        "Full Stack Development",

      email: "",

      phone: "",

      location: "",

      joined: "",

      image:
        null,

      stats: [
        {
          title: "Courses",
          value: profileStats.courses,

          icon: BookOpen,

          color:
            "bg-orange-100 text-orange-600",
        },

        {
          title: "Students",
          value: profileStats.students,

          icon: GraduationCap,

          color:
            "bg-violet-100 text-violet-600",
        },

        {
          title: "Live Classes",
          value: profileStats.live_classes,

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

  const users = profileData[role];

  const displayUser = loggedInUser
  ? {
      ...users,

      name: loggedInUser.name || users.name,
      email: loggedInUser.email || users.email,
      role: loggedInUser.role || users.role,

      phone: loggedInUser.phone || users.phone,
      location: loggedInUser.location || users.location,

      status: loggedInUser.status || "",

      // Teacher fields
      subject: loggedInUser.subject || "",
      experience: loggedInUser.experience || "",

      // Student fields (future use)
      department:
        loggedInUser.department ||
        users.department,

      joined:
        loggedInUser.joined ||
        users.joined,

      image:
        loggedInUser.image ||
        users.image,
    }
  : users;
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
  console.log(displayUser);
  console.log("Queries Count:", queries.length);
  console.log("Queries Data:", queries);

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
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-4
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
  onClick={() => {
    setEditForm({
      name: displayUser.name || "",
      email: displayUser.email || "",
      image: displayUser.image || null,
      phone: displayUser.phone || "",
      location: displayUser.location || "",
      subject: displayUser.subject || "",
      experience: displayUser.experience || "",
    });
    setShowEditModal(true);
  }}
  className="
    w-full
    sm:w-auto

    flex
    items-center
    justify-center
    gap-2

    px-5
    py-3

    rounded-2xl

    bg-slate-900
    hover:bg-black

    text-white
    font-medium

    whitespace-nowrap

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
              src={
              displayUser.image
              ? `${BACKEND_URL}/storage/${displayUser.image}`
              : "/default-avatar.png"
              }
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
                  {displayUser.name}
                </h2>

                <p
                  className="
                    text-slate-500
                    mt-1
                  "
                >
                  {displayUser.role}
                </p>

                <p
                  className="
                  text-slate-500
                    mt-1
                    "
                >
                  {displayUser.subject}
                </p>

                <p
                  className="
                  text-slate-500
                    mt-1
                    "
                >
                  {displayUser.experience}
                </p>

                <p
                  className="
                  text-slate-500
                    mt-1
                    "
                >
                  {displayUser.status}
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
                  {users.department}
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

                    value: displayUser.location,
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
                               break-all
                               sm:break-normal
                               max-w-full
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
    flex-col
    sm:flex-row
    sm:items-center

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
    text-xl
    sm:text-2xl

    font-bold

    text-slate-800

    break-words
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
                {notifications.map(
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
  flex-col
  sm:flex-row
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

    flex-shrink-0

    rounded-xl

    flex
    items-center
    justify-center

    ${getNotificationStyle(notification.type)}
  `}
>
                      
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
  className="
    font-medium
    text-slate-800

    break-words
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

          <div className="xl:col-span-2 space-y-10">
            {/* Stats */}

            {/* <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3

                gap-5
              "
            >
              {users.stats.map(
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
            </div> */}

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
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
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
  onClick={() => {

    if (role === "student") {

      setShowQueryModal(true);

    } else {

      console.log(" View All Clicked");

      setShowAllQueries(true);

    }

  }}
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
  {role === "student"
    ? "Raise Query"
    : "View All"}
</button>
              </div>

              <div className="space-y-4">
                {(showAllQueries
                ?queries
                :queries.slice(0,3)
                ).map(
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
                              {query.query?.charAt(0)}
                            </div>

                            <div>
                              <h3
                                className="
                                  font-semibold
                                  text-slate-800
                                "
                              >
                                {
                                  query.student_name || "Student"
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
                              query.query
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
                        {role === "teacher" &&
    query.status === "Pending" && (
      <button
        onClick={() => {
          setSelectedQuery(query);
          setShowAnswerModal(true);
        }}
        className="
          px-4
          py-2

          rounded-xl

          bg-slate-900
          text-white

          text-sm
        "
      >
        Answer
      </button>
    )}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              Edit Profile
            </h2>
          {profilePic ? (
              <img
    src={
        profilePic ||
        (displayUser.image
            ? `${BACKEND_URL}/storage/${displayUser.image}`
            : "/default-avatar.png")
    }
    className="w-24 h-24 rounded-full object-cover"
/>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-5xl mb-2">
    👤
  </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-300"
            />
            

            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="w-full border p-3 rounded-xl mb-3"
            />
          
            <input
               type="text"
               name="phone"
               value={editForm.phone}
               onChange={handleEditChange}
               placeholder="Phone Number"
               className="
                 w-full
                 border
                 rounded-xl
                 p-3
                 mb-3" />
             <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                placeholder="Location"
                className="
                  w-full
                  border
                  rounded-xl
                 p-3 
                  mb-3"
/>
            {role === "teacher" && (
  <>
    <p>
      <strong>Subject:</strong>{" "}
      {displayUser.subject}
    </p>

    <p>
      <strong>Experience:</strong>{" "}
      {displayUser.experience}
    </p>
  </>
)}

            {/* <input
              type="text"
              name="subject"
              value={editForm.subject}
              onChange={handleEditChange}
              placeholder="Subject"
              className="w-full border p-3 rounded-xl mb-3"
            />

            <input
              type="text"
              name="experience"
              value={editForm.experience}
              onChange={handleEditChange}
              placeholder="Experience"
              className="w-full border p-3 rounded-xl mb-3"
            /> */}

            <div className="flex gap-3 mt-4">
              <button
                onClick={updateProfile}
                className="bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="bg-gray-200 px-5 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {
  showQueryModal && (

    <div
      className="
        fixed
        inset-0
        bg-black/50

        flex
        items-center
        justify-center

        z-50
      "
    >

      <div
        className="
          bg-white

          rounded-3xl

          p-6

          w-full
          max-w-md
        "
      >

        <h2
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Raise Query
        </h2>

        <textarea
          value={queryText}
          onChange={(e) =>
            setQueryText(
              e.target.value
            )
          }
          rows={5}
          placeholder="Enter your query..."
          className="
            w-full

            border

            rounded-xl

            p-3
          "
        />

        <div
          className="
            flex
            justify-end
            gap-3

            mt-4
          "
        >

          <button
            onClick={() =>
              setShowQueryModal(
                false
              )
            }
          >
            Cancel
          </button>

          <button
            onClick={
              raiseQuery
            }
            className="
              bg-black
              text-white

              px-4
              py-2

              rounded-xl
            "
          >
            Submit
          </button>

        </div>

      </div>

    </div>

  )
}
{showAnswerModal && (
  <div
    className="
      fixed
      inset-0
      bg-black/40

      flex
      items-center
      justify-center

      z-50
    "
  >
    <div
      className="
        bg-white

        w-[500px]

        rounded-3xl

        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        Answer Query
      </h2>

      <p
        className="
          mb-4
          text-slate-600
        "
      >
        {selectedQuery?.query}
      </p>

      <textarea
        value={answerText}
        onChange={(e) =>
          setAnswerText(
            e.target.value
          )
        }
        rows={5}
        className="
          w-full

          border

          rounded-xl

          p-3
        "
      />

      <div
        className="
          flex
          justify-end
          gap-3

          mt-4
        "
      >
        <button
          onClick={() =>
            setShowAnswerModal(false)
          }
          className="
            px-4
            py-2

            rounded-xl

            border
          "
        >
          Cancel
        </button>

        <button
          onClick={submitAnswer}
          className="
            px-4
            py-2

            rounded-xl

            bg-slate-900
            text-white
          "
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

        </div>

  );
}
      
  
    
  