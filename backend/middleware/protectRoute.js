import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["JWT-Netflix"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided." });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token." });
    }

    const user = await User.findById(decoded.userId).select("-password");
    // this select to remove password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: " + error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
