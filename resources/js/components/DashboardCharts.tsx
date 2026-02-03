import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, LineChart, Line } from 'recharts';

const data = [
  { name: 'Ene', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const miniData = [
  { name: 'A', uv: 100 },
  { name: 'B', uv: 300 },
  { name: 'C', uv: 200 },
  { name: 'D', uv: 400 },
  { name: 'E', uv: 250 },
  { name: 'F', uv: 450 },
];

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Area Chart */}
      <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Ventas Mensuales</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Charts */}
      <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Clientes Nuevos</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={miniData}>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} dot={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Servicios Completados</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={miniData}>
            <Line type="monotone" dataKey="uv" stroke="#ffc658" strokeWidth={2} dot={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;