const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BlacklistedToken = require("../models/BlacklistedToken");
const sendEmail = require("../utils/nodemailer");
const crypto = require("crypto");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password} = req.body;
  // console.log(req.body);
  try {

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await User.findOne({ email });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).send("Invalid credentials");
    // }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// logout route

router.post("/logout", async (req, res) => {
  const { token } = req.body; // Expect the token to be sent in the request body

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expirationDate = new Date(decoded.exp * 1000); // Convert exp to milliseconds

    const blacklistedToken = new BlacklistedToken({
      token: token,
      expireAt: expirationDate,
    });

    await blacklistedToken.save();
    res.status(200).send("Logout successful, token blacklisted.");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
});

// forgot-password route

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with given email does not exist." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Please use the following link to reset your password: ${resetLink}`
    );

    res.json({ message: "Password reset link has been sent to your email.",user });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// reset-password route

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
     
    });
    
   console.log(user)

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if(user.resetTokenExpire < Date.now()){
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpire = undefined; // Clear the token expiration
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
