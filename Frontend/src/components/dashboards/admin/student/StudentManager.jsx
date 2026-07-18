import React, { useState, useEffect } from "react";
import api from "../../../../services/api.js";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  GraduationCap,
  Eye,
  Calendar,
  Mail,
} from "lucide-react";

import { motion } from "framer-motion";


// ================= INITIAL FORM =================

const initialForm = {
  name: "",
  email: "",
  phone: "",
  courses: "",
  year: "",
  batch_type: "Online",
  password: "",
  status: "Active",

  assignmentsCompleted: 0,
  totalAssignments: 20,

  testsCompleted: 0,
  totalTests: 5,

  attendance: 0,
};

const ManageStudents = () => {
 const [students, setStudents] = useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);
  // const [
  //   showProgressModal,
  //   setShowProgressModal,
  // ] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
   const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

 

  // ================= RESPONSIVE TABLE =================

  const [showTable, setShowTable] =
    useState(false);

    const fetchStudents = async () => {
  try {
    const response = await api.get(
      "/admin/students"
    );
     console.log(
      "Students API:",
      response.data
    );

    setStudents(response.data);
  } catch (error) {
    console.log(
      "Error fetching students:",
      error
    );
  }
};

  useEffect(() => {
    const handleResize = () => {
      // Show table only on extra large screens
      // where full table can fit properly
      setShowTable(window.innerWidth >= 1400);
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);
  useEffect(() => {
  fetchStudents();
}, []);

  // ================= HANDLE CHANGE =================

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]:
        target.type === "number"
          ? Number(target.value)
          : target.value,
    });
  };

  // ================= MODAL =================

  const openModal = (
    student = null
  ) => {
    setEditId(student?.id || null);

    setFormData(
      student || initialForm
    );

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditId(null);

    setFormData(initialForm);
  };

  const openStudentModal = (student) => {
  setSelectedStudent(student);
  setShowStudentModal(true);
};


  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editId) {
      // UPDATE STUDENT

      await api.put(
        `/admin/students/${editId}`,
        formData
      );

      alert("Student updated successfully");

    } else {
      // ADD STUDENT
console.log("TOKEN:", localStorage.getItem("token"));
      await api.post(
        "/admin/students",
        formData
      );

      alert("Student added successfully");
    }

    fetchStudents(); // reload students

    closeModal();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  // ================= DELETE =================

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this student?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(
      `/admin/students/${id}`
    );

    fetchStudents();
  } catch (error) {
    console.log(error);
  }
};
  // ================= PROGRESS =================

//   const calculateOverallProgress = (student) => {
//   const assignmentCompleted = Number(student.assignment_completed ?? 0);
//   const totalAssignments = Number(student.total_assignments ?? 20);

//   const testsCompleted = Number(student.tests_completed ?? 0);
//   const totalTests = Number(student.total_tests ?? 5);

//   const attendance = Number(student.attendance ?? 0);

//   const assignmentProgress =
//     totalAssignments > 0
//       ? (assignmentCompleted / totalAssignments) * 100
//       : 0;

//   const testProgress =
//     totalTests > 0
//       ? (testsCompleted / totalTests) * 100
//       : 0;

//   return Math.round(
//     (assignmentProgress + testProgress + attendance) / 3
//   );
// };

  // const openProgressModal = (
  //   student
  // ) => {
  //   setSelectedStudent({
  //     ...student,

  //     overallProgress:
  //       calculateOverallProgress(
  //         student
  //       ),
  //   });

  //   setShowProgressModal(true);
  // };

  // const closeProgressModal = () => {
  //   setSelectedStudent(null);

  //   setShowProgressModal(false);
  // };


  // ================= FILTER =================

  const filteredStudents =
  students.filter((student) =>
    `${student.name} ${student.email} ${student.courses}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= PROGRESS BAR =================

  // const ProgressBar = ({
  //   value,
  // }) => (
  //   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
  //     <div
  //       className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-700"
  //       style={{
  //         width: `${value}%`,
  //       }}
  //     />
  //   </div>
  // );
  // console.log(students);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] p-3 sm:p-5 lg:p-6">
      
      {/* ================= HEADER ================= */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">
        
        <div className="min-w-0">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
            
            <div className="w-2 h-2 rounded-full bg-red-600" />

            <span className="text-sm font-medium text-slate-600">
              Student Workspace
            </span>

          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-slate-800 leading-tight">
            Manage Students
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Create student accounts and track learning progress.
          </p>

        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() =>
            openModal()
          }
          className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg"
        >
          <Plus size={18} />
          Add Student
        </motion.button>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-lg p-4 mb-6">
        
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
          
          <Search
            className="text-slate-400 mr-3 shrink-0"
            size={18}
          />

          <input
            type="text"
            placeholder="Search student by name..."
            className="w-full outline-none bg-transparent text-slate-700 text-sm sm:text-base"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* ================= TABLE VIEW ================= */}

      {showTable ? (
        <div className="hidden xl:block rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-lg overflow-hidden">
          
          <table className="w-full">
            
            <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              
              <tr>
                
                <th className="w-[15%] px-4 py-4 text-left text-sm font-semibold">
                  Student
                </th>
                <th className="w-[8%] px-4 py-4 text-left text-sm font-semibold">
                  Phone
                </th>

                <th className="w-[18%] px-4 py-4 text-left text-sm font-semibold">
                  Courses
                </th>

                <th className="w-[8%] px-4 py-4 text-left text-sm font-semibold">
                  Batch
                </th>

                <th className="w-[5%] px-4 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                {/* <th className="w-[8%] px-4 py-4 text-left text-sm font-semibold">
                  Progress
                </th> */}

                <th className="w-[10%] px-4 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
              
              {filteredStudents.map(
                (student) => {
                  // const overallProgress =
                  //   calculateOverallProgress(
                  //     student
                  //   );

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-red-50/40 transition-all"
                    >
                      
                      {/* STUDENT */}

                      <td className="px-4 py-5">
                        
                        <div className="flex items-center gap-3 min-w-0">
                          
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white shrink-0">
                            <GraduationCap size={18} />
                          </div>

                          <div className="min-w-0">
                            
                            <h3 className="font-semibold text-slate-800 truncate text-sm">
                              {student.name}
                            </h3>

                            <p className="text-xs text-slate-500 truncate">
                              {student.email}
                            </p>

                          </div>

                        </div>

                      </td>
                      {/* PHONE */}

                    <td className="px-4 py-5">
                      <p className="text-sm text-slate-700">
                        {student.phone || "N/A"}
                      </p>
                    </td>

                      {/* COURSE */}

                      <td className="px-4 py-5">
                        
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {student.courses}
                        </p>

                      </td>

                      {/* BATCH */}

                      <td className="px-4 py-5">
                        
                        <div className="flex flex-col gap-1">
                          
                          <span className="text-sm text-slate-700 truncate">
                            {student.year}
                          </span>

                          <span className="w-fit px-2 py-1 rounded-full text-[10px] font-semibold bg-red-100 text-red-600">
                            {student.batch_type}
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="px-4 py-5">
                        
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                            student.status ===
                            "Active"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-rose-100 text-rose-600"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      {/* PROGRESS */}

                      {/* <td className="px-4 py-5">
                        
                        <div className="flex items-center gap-2">
                          
                          <ProgressBar
                            value={
                              overallProgress
                            }
                          />

                          <span className="text-xs font-semibold text-red-600 shrink-0">
                            {
                              overallProgress
                            }
                            %
                          </span>

                        </div>

                      </td> */}

                      {/* ACTIONS */}

                      <td className="px-4 py-5">
                        
                        <div className="flex items-center justify-center gap-1">
                          
                          <button
                            onClick={() =>
                              openModal(
                                student
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all flex items-center justify-center"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() =>
                              openStudentModal(
                                student
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all flex items-center justify-center"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                student.id
                              )
                            }
                            className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all flex items-center justify-center"
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>
      ) : (
        /* ================= CARD VIEW ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hi">
          
          {filteredStudents.map(
            (student, index) => {
              const overallProgress =
                calculateOverallProgress(
                  student
                );

              return (
                <motion.div
                  key={student.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.04,
                  }}
                  className="overflow-hidden rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-lg"
                >
                  
                  {/* TOP */}

                  <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 text-white">
                    
                    <div className="flex items-center gap-4">
                      
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <GraduationCap size={24} />
                      </div>

                      <div className="min-w-0">
                        
                        <h3 className="text-lg font-bold truncate">
                          {student.name}
                        </h3>

                        <p className="text-sm text-red-100 truncate">
                          {student.courses}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-5">
                    
                    <div className="space-y-4">
                      
                      <div className="flex items-center gap-2 text-slate-600 min-w-0">
                        
                        <Mail
                          size={16}
                          className="shrink-0"
                        />

                        <span className="text-sm truncate">
                          {student.email}
                        </span>

                      </div>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        
                        <div className="flex items-center gap-2 text-slate-600">
                          
                          <Calendar size={16} />

                          <span className="text-sm">
                            {student.year}
                          </span>

                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                          {student.batch_type}
                        </span>

                      </div>

                      <div className="flex items-center justify-between">
                        
                        <span className="text-sm text-slate-500">
                          Status
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            student.status ===
                            "Active"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-rose-100 text-rose-600"
                          }`}
                        >
                          {student.status}
                        </span>

                      </div>

                    </div>

                    {/* PROGRESS */}
{/* 
                    <div className="mt-5">
                      
                      <div className="flex items-center justify-between mb-2">
                        
                        <span className="text-sm font-medium text-slate-700">
                          Overall Progress
                        </span>

                        <span className="text-sm font-bold text-red-600">
                          {
                            overallProgress
                          }
                          %
                        </span>

                      </div>

                      <ProgressBar
                        value={
                          overallProgress
                        }
                      />

                    </div> */}

                    {/* ACTIONS */}

                    <div className="grid grid-cols-3 gap-2 mt-6">
                      
                      <button
                        onClick={() =>
                          openModal(
                            student
                          )
                        }
                        className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-orange-100 text-orange-600"
                      >
                        <Pencil size={16} />

                        <span className="text-xs font-medium">
                          Edit
                        </span>

                      </button>

                      <button
  onClick={() => openStudentModal(student)}
  className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-sky-100 text-sky-600"
>
  <Eye size={16} />
  <span className="text-xs font-medium">View</span>
</button>

                      <button
                        onClick={() =>
                          handleDelete(
                            student.id
                          )
                        }
                        className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-red-100 text-red-600"
                      >
                        <Trash2 size={16} />

                        <span className="text-xs font-medium">
                          Delete
                        </span>

                      </button>

                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>
      )}

      {/* ================= NO DATA ================= */}

      {filteredStudents.length ===
        0 && (
        <div className="rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-lg p-10 text-center text-slate-500 mt-6">
          No students found.
        </div>
      )}
      

      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3">
          
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl"
          >
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {editId
                  ? "Edit Student"
                  : "Add Student"}
              </h2>

              <button
                onClick={
                  closeModal
                }
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              
              {[
                [
                  "name",
                  "Student Name",
                  "text",
                ],
                [
                  "email",
                  "Email",
                  "email",
                ],
                [
                  "phone",
                  "Phone Number",
                  "text",
                ],

                [
                  "courses",
                  "Courses",
                  "text",
                ],
                [
                  "year",
                  "Year",
                  "text",
                ],
                [
                  "attendance",
                  "Attendance %",
                  "number",
                ],
              ].map(
                ([
                  name,
                  placeholder,
                  type,
                ]) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    placeholder={
                      placeholder
                    }
                    value={
                      formData[
                        name
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
                    required
                  />
                )
              )}

              <select
                name="batch_type"
                value={
                  formData.batch_type
                }
                onChange={
                  handleChange
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
              >
                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

              </select>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
              >
                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>

              </select>

              <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  className="px-5 py-3 rounded-2xl border border-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold"
                >
                  {editId
                    ? "Update Student"
                    : "Add Student"}
                </button>

              </div>

            </form>

          </motion.div>

        </div>
        
      )}
      
  <div>

    {/* Student Details Modal */}
    {showStudentModal && selectedStudent && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl p-8 w-[500px] relative">

          <button
            onClick={() => setShowStudentModal(false)}
            className="absolute top-4 right-4 text-red-600 text-xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6">
            Student Details
          </h2>

          <div className="space-y-3">

            <p><strong>Name:</strong> {selectedStudent.name}</p>

            <p><strong>Email:</strong> {selectedStudent.email}</p>

            <p><strong>Phone:</strong> {selectedStudent.phone || "N/A"}</p>

            <p><strong>Courses:</strong> {selectedStudent.courses}</p>

            <p><strong>Year:</strong> {selectedStudent.year}</p>

            <p><strong>Batch:</strong> {selectedStudent.batch_type}</p>

            <p><strong>Status:</strong> {selectedStudent.status}</p>

            <p><strong>Attendance:</strong> {selectedStudent.attendance}%</p>

            <p><strong>Assignments Completed:</strong> {selectedStudent.assignment_completed}</p>

            <p><strong>Tests Completed:</strong> {selectedStudent.tests_completed}</p>

            <p><strong>Location:</strong> {selectedStudent.location || "N/A"}</p>

          </div>

        </div>

      </div>
    )}

  </div>

      
    </div>
    
    
  );
};


export default ManageStudents;