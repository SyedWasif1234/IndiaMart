import React from "react";
import { Outlet } from "react-router-dom";
import AdminPanel_SideBar from "../components/AdminPanel_SideBar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 to-teal-100">
      <Navbar />

      <div className="flex flex-1 min-h-screen ">
        <AdminPanel_SideBar />

        <main className="flex-1 overflow-auto p-6 bg-gradient-to-r from-gray-300 to-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default AdminLayout