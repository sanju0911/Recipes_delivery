const Admin = require("../Models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

   
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ token, adminId: admin._id, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getadmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate("recipes");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
