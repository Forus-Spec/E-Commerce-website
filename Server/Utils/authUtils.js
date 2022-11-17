import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createToken = (user) => {
  if (!user.role) Promise.reject(new Error("No user role were specified"));

  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
      algorithm: "HS256"
    }
  );
};

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const createPasswordToken = (payload) =>
  jwt.sign(payload, process.env.PASSWORD_TOKEN, { expiresIn: "15m" });

export const verifyPasswordToken = (payload) =>
  jwt.verify(payload, process.env.PASSWORD_TOKEN, { expiresIn: "15m" });

export const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};
