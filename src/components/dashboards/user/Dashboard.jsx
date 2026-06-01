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
          

        <DashboardCards cards={config.cards} />
      </main>
    </div>
  );
};

export default Dashboard;