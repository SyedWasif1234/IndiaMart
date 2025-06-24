import {
  Briefcase,
  Building,
  LayoutDashboard,
  Settings,
  Package,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminPanel_SideBar = () => {
  return (
    <div className="w-60 bg-white border-r flex-shrink-0">
      <aside className="w-60 bg-white border-r">
        <div className="px-4 py-4 text-xl font-bold border-b border-gray-200 text-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-1 p-4 text-gray-700">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/Admin-Panel" />
          <NavItem icon={Users} label="Users" to="/Admin-Panel/users" />
          <NavItem icon={Package} label="Products" to="/Admin-Panel/AdminProductsPage" />
          <NavItem icon={Briefcase} label="Employees" to="/Admin-Panel/employees" />
          <NavItem icon={Building} label="Departments" to="/Admin-Panel/departments" />
          <NavItem icon={Settings} label="Organizations" to="/Admin-Panel/organizations" />
        </nav>
      </aside>
    </div>
  );
};

{/* ISSUE FACED :  Now when the current path is
   /Admin-Panel/users, both /Admin-Panel and /Admin-Panel/users
    are partially matched by React Router's 
    NavLink, because it uses
    prefix matching by default. 
    ✅ Fix: Use end prop on the Dashboard NavLink
    */}

const NavItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    end={to === "/Admin-Panel"}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-teal-700 text-white font-semibold"
          : "hover:bg-teal-700 hover:text-white"
      }`
    }
  >
    <Icon className="w-5 h-5" />
    {label}
  </NavLink>
);

export default AdminPanel_SideBar;
