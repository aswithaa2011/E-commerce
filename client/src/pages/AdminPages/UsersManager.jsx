import { useState, useEffect } from "react";
import { adminApi } from "../../api/axiosInstance";

const UsersManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await adminApi.get("/admin/users");
        setUsers(data);
      } catch {
        console.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Users</h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;
