import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { adminApi } from "../../api/axiosInstance";

const CategoriesManager = ({ categories, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const openModal = (c = null) => {
    setForm(c ? { name: c.name, description: c.description || "" } : { name: "", description: "" });
    setEditId(c?._id || null);
    setIsOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editId) await adminApi.put(`/admin/categories/${editId}`, form);
      else await adminApi.post("/admin/categories", form);
      onRefresh();
      setIsOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete category?")) return;
    await adminApi.delete(`/admin/categories/${id}`);
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold">Categories</h2>
        <button onClick={() => openModal()}
          className="bg-[#8E1C9D] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-md">
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{c.name}</td>
                <td className="p-4 text-sm text-gray-500">{c.slug}</td>
                <td className="p-4 text-sm text-gray-500 truncate max-w-xs">{c.description || "—"}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => openModal(c)} className="text-blue-500 bg-blue-50 p-2 rounded-lg hover:bg-blue-100">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#8E1C9D] px-6 py-4 text-white">
              <h3 className="text-xl font-bold">{editId ? "Edit Category" : "Add Category"}</h3>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                <input type="text" value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8E1C9D] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8E1C9D] outline-none" rows="3" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-2 bg-gray-100 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#8E1C9D] text-white rounded-lg font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManager;
