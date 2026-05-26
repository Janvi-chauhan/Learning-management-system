import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCard";
import { roleConfig } from "../../../config/roleConfig";

const Dashboard = ({ role }) => {
  const config = roleConfig[role];
  console.log(config);
  return (
    <div className="flex bg-slate-100">
      <Sidebar menu={config.sidebarItems} />


      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Here's your dashboard overview.
          </p>
        </div>

        <DashboardCards cards={config.cards} />
      </main>
    </div>
  );
};

export default Dashboard;