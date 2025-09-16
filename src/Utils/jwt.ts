import jwt from "jsonwebtoken";

export const generateToken = (userId: number | string, role: string = "admin"): string => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};
