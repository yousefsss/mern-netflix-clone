import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password Should Be 8 Characters At Least" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const existingUserByName = await User.findOne({ username: username });
    if (existingUserByName) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error:" + error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("Invalid Credentials");
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res
      .status(201)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error While Login" });
    console.log("Error:" + error);
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("JWT-Netflix");
    res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    console.log("Error While Tring To Logout: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
}
