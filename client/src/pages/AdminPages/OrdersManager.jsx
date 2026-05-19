const OrdersManager = ({ orders, onUpdate }) => {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Customer Orders</h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-gray-600">{order.orderId}</td>
                  <td className="p-4">{order.userEmail}</td>
                  <td className="p-4">{order.totalItems} items</td>
                  <td className="p-4 font-bold text-purple-700">Rs. {order.totalPrice}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Shipped"   ? "bg-blue-100 text-blue-700" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdate(order._id, e.target.value)}
                      className="border rounded px-2 py-1 focus:ring-2 focus:ring-[#8E1C9D] outline-none"
                    >
                      {["Pending","Processing","Shipped","Delivered","Cancelled"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="p-8 text-center text-gray-400 italic">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManager;
