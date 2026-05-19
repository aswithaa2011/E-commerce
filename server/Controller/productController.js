import Product from "../model/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isActive: true };
    if (category) filter.categoryId = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    const products = await Product.find(filter).populate("categoryId", "name slug");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId", "name slug");
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
