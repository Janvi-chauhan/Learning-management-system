export const roleData = {
  admin: {
    stats: [
      {
        title: "Total Students",
        value: "1,245",
        change: "+12.5%",
        color: "red",
      },
      {
        title: "Total Teachers",
        value: "48",
        change: "+4.3%",
        color: "yellow",
      },
      {
        title: "Courses",
        value: "28",
        change: "+8.1%",
        color: "red",
      },
      {
        title: "Revenue",
        value: "₹2.4L",
        change: "+15.8%",
        color: "yellow",
      },
    ],
  },

  teacher: {
    stats: [
      {
        title: "My Students",
        value: "180",
        change: "+9%",
        color: "red",
      },
      {
        title: "My Courses",
        value: "6",
        change: "+2",
        color: "yellow",
      },
      {
        title: "Assignments",
        value: "24",
        change: "+5",
        color: "red",
      },
      {
        title: "Attendance",
        value: "92%",
        change: "+1.5%",
        color: "yellow",
      },
    ],
  },

  student: {
    stats: [
      {
        title: "Enrolled Courses",
        value: "4",
        change: "+1",
        color: "red",
      },
      {
        title: "Assignments Done",
        value: "18",
        change: "+3",
        color: "yellow",
      },
      {
        title: "Attendance",
        value: "88%",
        change: "+2%",
        color: "red",
      },
      {
        title: "Rank",
        value: "#12",
        change: "+4",
        color: "yellow",
      },
    ],
  },
};

export const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "MERN Stack",
    status: "Active",
    progress: 85,
  },
  {
    id: 2,
    name: "Priya Patil",
    course: "Python Programming",
    status: "Pending",
    progress: 40,
  },
  {
    id: 3,
    name: "Sneha Shah",
    course: "React Development",
    status: "Completed",
    progress: 100,
  },
  {
    id: 4,
    name: "Amit Verma",
    course: "Java Full Stack",
    status: "Active",
    progress: 72,
  },
  {
    id: 5,
    name: "Neha Singh",
    course: "Data Structures",
    status: "Active",
    progress: 66,
  },
];

export const activities = [
  {
    id: 1,
    title: "New student registered",
    description: "Aarav Patil enrolled in MERN Stack Development.",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "Assignment submitted",
    description: "Sneha Shah submitted React Dashboard Task.",
    time: "15 mins ago",
  },
  {
    id: 3,
    title: "Payment received",
    description: "₹5,000 fee received from Rahul Sharma.",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Course updated",
    description: "Python course content was updated.",
    time: "3 hours ago",
  },
  {
    id: 5,
    title: "Attendance marked",
    description: "Today's attendance has been completed.",
    time: "Today",
  },
];