import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Token invalid");
    req.user = user;
    next();
  });
};