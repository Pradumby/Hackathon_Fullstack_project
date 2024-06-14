const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {username, password, role} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword, role});
    await newUser.save();
    res.status(201).json({message: "User created successfully"});
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

const login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).json({error: "Username or password is incorrect"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({error: "Username or password is incorrect"});
    }
    const token = jwt.sign({id: user._id, role: user.role}, "secret", {
      expiresIn: "1h",
    });
    res.json({
      token,
      role: user.role,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

module.exports = {register, login};
