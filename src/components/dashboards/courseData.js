// src/data/coursesData.js

const coursesData = [
  {
    id: 1,

    slug: "dsa-with-python",

    category:
      "IT & Software / Other IT & Software / DSA",

    title: "DSA with Python",

    shortDesc:
      "Master Data Structures & Algorithms with Python through real projects and placement focused training.",

    createdBy: "Programming Classes",

    updatedAt: "2026-02-01",

    language: ["English", "Hindi"],

    rating: 4.8,

    students: "1200+ Students",

    duration: "6 Months",

    level: "Intermediate",

    status: "Active",

    latest: true,

    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

    previewVideo:
      "https://youtube.com",

    brochure:
      "/brochures/dsa-python.pdf",

    // ================= LEARNINGS =================

    learnings: [
      "Live project based learning",

      "DSA from basics to advanced",

      "Resume & LinkedIn optimization",

      "Mock interviews with feedback",

      "Placement assistance & referrals",

      "Problem solving & coding mindset",

      "Interview-focused preparation",

      "Real-world industry examples",
    ],

    // ================= ROADMAP =================

    roadmap: [
      {
        step: 1,

        title: "Python Basics",

        desc:
          "Syntax, variables, loops, functions and foundations",
      },

      {
        step: 2,

        title: "DSA Core",

        desc:
          "Arrays, strings, linked list, stack, queue & recursion",
      },

      {
        step: 3,

        title: "Advanced Algorithms",

        desc:
          "Trees, graphs, hashing, dynamic programming",
      },

      {
        step: 4,

        title: "Real Projects",

        desc:
          "Industry-level practical implementation",
      },

      {
        step: 5,

        title: "Placement Preparation",

        desc:
          "Mock interviews, resume & aptitude",
      },
    ],

    // ================= CURRICULUM =================

    curriculum: [
      "Python Basics",

      "Functions & OOP",

      "Arrays & Strings",

      "Linked List",

      "Stack & Queue",

      "Trees & Graphs",

      "Dynamic Programming",

      "Industry Projects",
    ],

    // ================= MENTOR =================

    mentor: {
      name: "Industry Expert",

      experience:
        "10+ Years Experience",

      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    // ================= CERTIFICATION =================

    certification:
      "Globally recognized certification with internship letter.",

    // ================= REVIEWS =================

    reviews: [
      {
        student:
          "Rahul Sharma",

        rating: 5,

        comment:
          "Best course for placements",
      },

      {
        student:
          "Priya Verma",

        rating: 5,

        comment:
          "Very practical learning experience",
      },
    ],
  },

  // ======================================================
  // SECOND COURSE
  // ======================================================

  {
    id: 2,

    slug: "mern-stack-development",

    category:
      "Web Development / Full Stack",

    title: "MERN Stack Development",

    shortDesc:
      "Become a complete full stack developer using MongoDB, Express, React and Node.js.",

    createdBy: "Programming Classes",

    updatedAt: "2026-01-15",

    language: ["English", "Hindi"],

    rating: 4.9,

    students: "1800+ Students",

    duration: "8 Months",

    level: "Advanced",

    status: "Active",

    latest: true,

    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

    previewVideo:
      "https://youtube.com",

    brochure:
      "/brochures/mern.pdf",

    learnings: [
      "Frontend + Backend mastery",

      "Authentication systems",

      "REST APIs",

      "MongoDB integration",

      "Deployment",

      "Real-world projects",

      "Resume building",

      "Placement support",
    ],

    roadmap: [
      {
        step: 1,

        title: "Frontend Basics",

        desc:
          "HTML, CSS, JavaScript foundations",
      },

      {
        step: 2,

        title: "React.js",

        desc:
          "Hooks, routing, API handling",
      },

      {
        step: 3,

        title: "Backend Development",

        desc:
          "Node.js & Express APIs",
      },

      {
        step: 4,

        title: "MongoDB",

        desc:
          "Database design & integration",
      },

      {
        step: 5,

        title: "Deployment",

        desc:
          "Deploy full applications",
      },
    ],

    curriculum: [
      "HTML & CSS",

      "JavaScript",

      "React",

      "Node.js",

      "Express",

      "MongoDB",

      "Authentication",

      "Deployment",
    ],

    mentor: {
      name: "Senior MERN Developer",

      experience:
        "8+ Years Experience",

      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },

    certification:
      "Industry-recognized MERN certification.",

    reviews: [
      {
        student:
          "Aditya",

        rating: 5,

        comment:
          "Got placed after completing this course",
      },
    ],
  },
];

// ======================================================
// ONLY SHOW LATEST 7 COURSES
// ======================================================

export const latestCourses = [...coursesData]
  .sort(
    (a, b) =>
      new Date(b.updatedAt) -
      new Date(a.updatedAt)
  )
  .slice(0, 7);

export default coursesData;