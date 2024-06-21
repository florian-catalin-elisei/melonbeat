import jwt from "jsonwebtoken";
import "dotenv/config";

export const getToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

  return token;
};
