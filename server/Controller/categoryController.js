import Category from "../model/Category.js";

// GET /api/admin/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/admin/categories
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ message: "Name is required" });

    const slug = name.toLowerCase().replace(/ /g, "-");
    const newCat = await Category.create({ name, slug, description });
    return res.status(201).json(newCat);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/admin/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
