import DashboardLayout from "../layout/DashboardLayout";

export default function DashboardPage() {
  const role = localStorage.getItem("role");

  return (
    <DashboardLayout role={role} />
  );
}