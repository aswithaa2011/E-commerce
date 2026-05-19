import ContactMessage from "../model/ContactMessage.js";

// POST /api/contact  (public)
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, orderId, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, email, and message are required" });

    const contact = await ContactMessage.create({ name, email, phone, orderId, message });
    return res.status(201).json({ message: "Message received! We'll reply within 24 hours.", id: contact._id });
  } catch (err) {
    console.error("Contact submit error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/contacts  (admin protected)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/contacts/:id/status  (admin protected)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.status(200).json(contact);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
