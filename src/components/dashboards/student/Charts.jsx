// Charts.jsx
// Student Dashboard Analytics

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import studentsData from "../studentData";
const Charts = () => {

  const student = studentsData[0];

  const assignmentProgress =
    student.totalAssignments > 0
      ? Math.round(
          (student.assignmentsCompleted /
            student.totalAssignments) *
            100
        )
      : 0;

  const testProgress =
    student.totalTests > 0
      ? Math.round(
          (student.testsCompleted /
            student.totalTests) *
            100
        )
      : 0;

  const attendance = student.attendance || 0;

  const overallProgress = Math.round(
    (assignmentProgress +
      testProgress +
      attendance) /
      3
  );

  // --------------------------------------------------
  // Chart Data
  // --------------------------------------------------
  const overallData = [
    {
      name: "Overall",
      value: overallProgress,
      fill: "#EF0000",
    },
  ];

  const assignmentPieData = [
    {
      name: "Completed",
      value: student.assignmentsCompleted,
    },
    {
      name: "Pending",
      value:
        student.totalAssignments -
        student.assignmentsCompleted,
    },
  ];

  const testPieData = [
    {
      name: "Completed",
      value: student.testsCompleted,
    },
    {
      name: "Pending",
      value:
        student.totalTests -
        student.testsCompleted,
    },
  ];

  const performanceData = [
    {
      name: "Assignments",
      value: assignmentProgress,
    },
    {
      name: "Tests",
      value: testProgress,
    },
    {
      name: "Attendance",
      value: attendance,
    },
    {
      name: "Overall",
      value: overallProgress,
    },
  ];

  const COLORS = [
    "#EF0000",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Performance Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {student.name}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Overall Progress"
          value={`${overallProgress}%`}
          color="text-red-600"
        />
        <SummaryCard
          title="Assignments"
          value={`${assignmentProgress}%`}
          color="text-blue-600"
        />
        <SummaryCard
          title="Tests"
          value={`${testProgress}%`}
          color="text-green-600"
        />
        <SummaryCard
          title="Attendance"
          value={`${attendance}%`}
          color="text-yellow-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Overall Progress */}
        <ChartCard title="Overall Progress">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={overallData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="text-center -mt-40 mb-20">
            <p className="text-4xl font-bold text-red-600">
              {overallProgress}%
            </p>
            <p className="text-gray-500 text-sm">
              Overall Progress
            </p>
          </div>
        </ChartCard>

        {/* Assignment Completion */}
        <ChartCard title="Assignment Completion">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={assignmentPieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#E5E7EB" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Test Completion */}
        <ChartCard title="Test Completion">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={testPieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                <Cell fill="#10B981" />
                <Cell fill="#E5E7EB" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Performance Comparison */}
        <ChartCard title="Performance Breakdown">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={performanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Courses Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          My Enrolled Courses
        </h2>

        <div className="flex flex-wrap gap-3">
          {student.course.map((course, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-100 font-medium"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Summary Card
const SummaryCard = ({
  title,
  value,
  color,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <p className="text-sm font-medium text-gray-500">
      {title}
    </p>
    <h3 className={`text-3xl font-bold mt-2 ${color}`}>
      {value}
    </h3>
  </div>
);

// Chart Card
const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default Charts;