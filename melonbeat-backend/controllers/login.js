import { getToken } from "../lib/jwt.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "https://melonbeat-frontend.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(403).json({ error: "Invalid email" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(403).json({ error: "Invalid password" });

    const token = await getToken(user);
    const userToReturn = { ...user.toJSON(), token };

    delete userToReturn.password;

    return res.status(200).send(userToReturn);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
