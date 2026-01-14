import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN ||
  "1d") as jwt.SignOptions["expiresIn"];
const REFRESH_EXPIRES_IN = (process.env.REFRESH_EXPIRES_IN ||
  "7d") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
if (!REFRESH_SECRET) throw new Error("REFRESH_SECRET is not defined");

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
};
