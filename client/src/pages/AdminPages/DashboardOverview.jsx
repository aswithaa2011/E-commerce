import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardOverview = ({ stats }) => {
  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <p className="text-3xl font-black text-purple-700 mt-1">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-3xl font-black text-green-600 mt-1">Rs. {stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Active Categories</p>
            <p className="text-3xl font-black text-gray-800 mt-1">{stats.totalCategories || 0}</p>
          </div>
        </div>

        {/* Charts & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Status */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div> Order Status
            </h3>
            <div className="space-y-3">
              {["Pending","Processing","Shipped","Delivered","Cancelled"].map((status) => {
                const count = stats.ordersByStatus?.find(s => s._id === status)?.count || 0;
                const pct = stats.totalOrders ? Math.round((count / stats.totalOrders) * 100) : 0;
                const colors = { Pending:"bg-yellow-400", Processing:"bg-blue-500", Shipped:"bg-indigo-500", Delivered:"bg-green-500", Cancelled:"bg-red-500" };
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span>{status}</span><span>{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`${colors[status]} h-2.5 rounded-full`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div>
                Daily Revenue
              </div>
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.dailyRevenue || []}>
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} tickFormatter={d => d.slice(5)} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => `Rs. ${v}`} />
                <Bar dataKey="revenue" fill="#8E1C9D" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
