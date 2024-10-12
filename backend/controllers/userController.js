import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";

export async function registerUser(req, res) {
  try {
    let { firstname, lastname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const user = new userModel({ firstname, lastname, email, password, role });
    await user.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password, role } = req.body;

    const checkUser = await userModel.findOne({ email }).exec();

    if (!checkUser) {
      res.status(404).json({ error: "Invalid Credentials" });
    }

    const check = await bcrypt.compare(password, checkUser.password);

    if (!check) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    if (checkUser.role === role) {
      const token = generateToken(checkUser);
      res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: false, 
          sameSite: "strict",
          maxAge: 3600000,
        })
        .status(200)
        .json({
          message: "Login Successful",
        });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function logoutUser(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export function isUserLoggedIn(req, res) {
  res.json({ user: req.user });
}
