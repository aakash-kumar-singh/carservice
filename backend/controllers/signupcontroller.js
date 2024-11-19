const signupmodel=require('../models/signupmodel');
const signupcontrollers = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await signupmodel.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Phone number already in use" });
    }

    const newUser = new signupmodel({ name, phone, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = signupcontrollers;
