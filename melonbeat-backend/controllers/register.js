import { getToken } from "../lib/jwt.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password, username } = req.body;
    const user = await User.findOne({ email });

    if (user) return res.status(403).json({ error: "A user with this email already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, firstName, lastName, password: hashPassword, username };
    const newUser = await User.create(newUserData);
    res.header("Access-Control-Allow-Origin", "https://melonbeat-frontend.vercel.app");
    const token = await getToken(newUser);
    const userToReturn = { ...newUser.toJSON(), token };

    delete userToReturn.password;

    return res.status(200).send(userToReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
