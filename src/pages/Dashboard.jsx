import React from 'react';
import Sidebar from '../components/admin/Sidebar';


const Dashboard = () => {
  return (
    <div className="flex min-h-screen  bg-[#F7F9FC]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

 
    </div>
  );
};

export default Dashboard;