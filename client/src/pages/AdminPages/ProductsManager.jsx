// client/src/pages/AdminPages/ProductsManager.jsx
import { useState, useEffect } from "react";
import { adminApi } from "../../api/axiosInstance";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ProductsManager = () => {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen]         = useState(false);
  const [editId, setEditId]         = useState(null);
  const [form, setForm] = useState({
    name: "", price: "", offprice: "", percent: "",
    img: "", stock: "", categoryId: "", description: ""
  });

  const fetchProducts   = async () => {
    const { data } = await adminApi.get("/admin/products");
    setProducts(data);
  };
  const fetchCategories = async () => {
    const { data } = await adminApi.get("/admin/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openModal = (p = null) => {
    setForm(p
      ? { name: p.name, price: p.price, offprice: p.offprice || "", percent: p.percent || "",
          img: p.img || "", stock: p.stock, categoryId: p.categoryId?._id || "", description: p.description || "" }
      : { name: "", price: "", offprice: "", percent: "", img: "", stock: "", categoryId: "", description: "" }
    );
    setEditId(p?._id || null);
    setIsOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const cat = categories.find(c => c._id === form.categoryId);
    const payload = { ...form, categoryName: cat?.name || "" };
    if (editId) await adminApi.put(`/admin/products/${editId}`, payload);
    else        await adminApi.post("/admin/products", payload);
    fetchProducts();
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    await adminApi.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold">Products</h2>
        <button onClick={() => openModal()}
          className="bg-[#8E1C9D] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold">
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <img src={p.img} alt={p.name} className="h-12 w-12 object-cover rounded-lg bg-gray-100" />
                </td>
                <td className="p-4 font-medium text-gray-800 max-w-[200px] truncate">{p.name}</td>
                <td className="p-4">
                  <span className="bg-purple-100 text-[#8E1C9D] px-3 py-1 rounded-full text-xs font-semibold">
                    {p.categoryName || "—"}
                  </span>
                </td>
                <td className="p-4 font-bold text-purple-700">Rs. {p.price}</td>
                <td className="p-4">
                  <span className={`font-medium ${p.stock < 5 ? "text-red-500" : "text-green-600"}`}>
                    {p.stock} {p.stock < 5 && "⚠ Low"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => openModal(p)} className="text-blue-500 bg-blue-50 p-2 rounded-lg hover:bg-blue-100">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#8E1C9D] px-6 py-4">
              <h3 className="text-xl font-bold text-white">{editId ? "Edit Product" : "Add Product"}</h3>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-3 max-h-[80vh] overflow-y-auto">
              {[
                { name: "name",        label: "Product Name",      type: "text"   },
                { name: "img",         label: "Image URL",         type: "text"   },
                { name: "price",       label: "Selling Price",     type: "number" },
                { name: "offprice",    label: "Original Price",    type: "number" },
                { name: "percent",     label: "Discount Label",    type: "text"   },
                { name: "stock",       label: "Stock Quantity",    type: "number" },
                { name: "description", label: "Description",       type: "text"   },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]}
                    onChange={e => setForm({...form, [e.target.name]: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E1C9D] outline-none" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="categoryId" value={form.categoryId}
                  onChange={e => setForm({...form, categoryId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E1C9D] outline-none">
                  <option value="">— Select category —</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 bg-gray-100 rounded-lg font-semibold">Cancel</button>
                <button type="submit"
                  className="flex-1 py-2 bg-[#8E1C9D] text-white rounded-lg font-semibold">
                  {editId ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
