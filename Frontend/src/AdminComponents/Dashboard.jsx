/* src/pages/Dashboard.jsx */
import React from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  MoreVertical,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// ─────────── dummy data ───────────
const kpi = [
  { label: 'Sales',   value: 2382,   icon: <ShoppingCart size={18} /> },
  { label: 'Earnings',value: 21300,  icon: <DollarSign size={18}   /> },
  { label: 'Visitors',value: 14212,  icon: <Users size={18}         /> },
  { label: 'Orders',  value: 64,     icon: <Package size={18}       /> },
];

const lineData = [
  { name: 'Jan', pv: 1000 }, { name: 'Feb', pv: 2400 },
  { name: 'Mar', pv: 1700 }, { name: 'Apr', pv: 2600 },
  { name: 'May', pv: 3000 }, { name: 'Jun', pv: 3500 },
  { name: 'Jul', pv: 2800 }, { name: 'Aug', pv: 4000 },
  { name: 'Sep', pv: 3600 }, { name: 'Oct', pv: 3900 },
  { name: 'Nov', pv: 3200 }, { name: 'Dec', pv: 4200 },
];

const pieData = [
  { name: 'Chrome',  value: 4306, color: '#3B82F6' },
  { name: 'Firefox', value: 3801, color: '#F97316' },
  { name: 'Edge',    value: 1689, color: '#EF4444' },
  { name: 'Other',   value: 3251, color: '#6366F1' },
];

// ─────────── UI component ───────────
const Dashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-300 to-gray-100 text-gray-900  min-h-screen space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        <div className="space-x-2">
          <button className="px-3 py-2 text-sm rounded bg-gray-200 dark:bg-gray-500">Invite a Friend</button>
          <button className="px-3 py-2 text-sm rounded bg-blue-600 text-white">New Project</button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpi.map((card) => (
          <div
            key={card.label}
            className="bg-white  rounded-lg p-4 shadow flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{card.label}</span>
              <span className="bg-blue-50 text-blue-600 dark:bg-gray-700 p-2 rounded-full">
                {card.icon}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {card.label === 'Earnings' ? '$' : ''}
              {card.value.toLocaleString()}
            </div>
            {/* placeholder delta – adjust as needed */}
            <span className="text-xs text-green-600">↑ 3.65 % Since last week</span>
          </div>
        ))}
      </div>

      {/* grid below KPI */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* recent movement chart */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-semibold">Recent Movement</h2>
            <select className="bg-gray-100  text-sm p-1 rounded">
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* donut / pie chart */}
        <div className="bg-white  rounded-lg shadow p-4 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Browser Usage</h2>
            <MoreVertical size={18} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* legend */}
          <ul className="space-y-1 text-sm">
            {pieData.map((b) => (
              <li key={b.name} className="flex justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: b.color }}
                  />
                  {b.name}
                </span>
                {b.value}
              </li>
            ))}
          </ul>
        </div>

        {/* calendar placeholder */}
        <div className="bg-white  rounded-lg shadow p-4 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Calendar</h2>
            <MoreVertical size={18} className="text-gray-400" />
          </div>
          <div className="h-48 flex items-center justify-center text-gray-400">
            {/* Replace with a calendar component */}
            Calendar Component Here
          </div>
        </div>

        {/* real-time map placeholder */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Real-Time</h2>
            <MoreVertical size={18} className="text-gray-400" />
          </div>
          <div className="h-48 flex items-center justify-center text-gray-400">
            {/* Replace with a map library (e.g., react-simple-maps) */}
            World Map Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
