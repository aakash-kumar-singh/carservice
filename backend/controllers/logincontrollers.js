const signupmodel = require('../models/signupmodel');

const logincontrollers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await signupmodel.findOne({ email });

    if (result && result.password === password) {
      const name = result.name;
      res.status(200).json({
        message: "Logged in successfully",
        name: name,
        email: result.email,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = logincontrollers;
