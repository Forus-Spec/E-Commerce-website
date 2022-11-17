import { UNAUTHORIZED } from "../Utils/statusCodes.js";
import jwt from "jsonwebtoken";

export const attachUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer") || token === "Bearer") {
    return res.status(UNAUTHORIZED).json({ message: "Access denied ⚠️" });
  }

  const decodedToken = jwt.verify(token.slice(7), process.env.JWT_SECRET);

  if (!decodedToken) {
    return res.status(UNAUTHORIZED).json({
      message: "it seems you token has been expired please re-authenticate ⚠️"
    });
  } else {
    req.user = decodedToken;
    next();
  }
};

export const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(UNAUTHORIZED).json({ message: "Insufficient role ⚠️" });
  }
  next();
};

// const auth = async (req, res, next) => {
//    const authHeader = req.headers.authorization
//    if (!authHeader || !authHeader.startsWith('Bearer')) {
//       throw new UnAuthenticatedError('Authentication Invalid')
//    }
//    const token = authHeader.split(' ')[1]
//    try {
//       const payload = jwt.verify(token, process.env.JWT_SECRET)
//       req.user = { userId: payload.userId }
//       next()
//    } catch (error) {
//       throw UnAuthenticatedError('Authentication Invalid')
//    }
// }
