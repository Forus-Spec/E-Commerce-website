import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import { BAD_REQUEST, OK } from "../Utils/statusCodes.js";
import {
  BadRequestError,
  Forbidden,
  UnauthorizedError
} from "../Utils/APIError.js";

import {
  createPasswordToken,
  createToken,
  hashPassword,
  verifyPasswordToken
} from "../Utils/authUtils.js";

import jwtDecode from "jwt-decode";
import { verifyPassword } from "../Utils/authUtils.js";
import { nanoid } from "nanoid";

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "fares",
  key: API_KEY
});

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    passwordConfirm,
    password,
    country,
    city,
    phone
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !country ||
    !city ||
    !phone
  )
    return Promise.reject(new BadRequestError("Please provide all values !"));

  const userExists = await User.findOne({ email }).lean();

  if (userExists) throw new BadRequestError("Email is already in use !");
  if (password !== passwordConfirm) throw new BadRequestError("Password do not match !");
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    country,
    city,
    phone,
    password: hashedPassword
  });

  if (newUser) {
    const token = createToken(newUser);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    const userInfo = {
      firstName,
      lastName,
      email,
      location: { country, city }
    };
    res.status(OK).json({
      message: `${firstName} Successfully Registered !`,
      userInfo,
      token,
      expiresAt
    });
  } else {
    throw new Forbidden("Something went totally wrong ! Please contact us");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide all values");

  const user = await User.findOne({ email }).lean().select("+password");

  if (!user)
    throw new UnauthorizedError(
      "Invalid Credentials verify your password or email"
    );

  const isPasswordCorrect = await verifyPassword(password, user.password);

  if (isPasswordCorrect) {
    const { firstName, lastName, email, country, city } = user;
    const token = createToken(user);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;
    const role = decodedToken.role;

    res.status(OK).json({
      message: "Successfully Connected",
      userInfo: {
        firstName,
        lastName,
        email,
        role,
        location: { country, city }
      },
      token,
      expiresAt
    });
  } else {
    throw new UnauthorizedError(
      "Invalid Credentials verify your password or email"
    );
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new BadRequestError("User does not exist");

  const resetCode = nanoid(5).toUpperCase();
  user.resetCode = resetCode;
  user.save();

  const token = createPasswordToken({ resetCode, email });
  await user.updateOne({ resetPasswordLink: token });

  const data = {
    from: "essayehfares@gmail.com",
    to: email,
    subject: `Email reset password`,
    template: "passwordreset",
    "t:variables": JSON.stringify({
      // be sure to stringify your payload
      username: `${user.firstName} ${user.lastName}`,
      resetLink: `${process.env.URL_CLIENT}/${token}`
    })
  };

  client.messages
    .create(DOMAIN, data)
    .then((body) => {
      res.status(body.status).json({
        message: "reset link sent successfully 📧, please check your email"
      });
    })
    .catch((err) => {
      res.status(BAD_REQUEST).json({
        message: `something went wrong please try again later${err.message}`
      });
    });
};
export const resetPassword = async (req, res) => {
  const { token } = req.params;

  if (token) {
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const result = verifyPasswordToken(token);

    const { email, resetCode } = result;

    const user = await User.findOne({ email, resetCode }).lean();

    if (!user.resetPasswordLink || user.resetPasswordLink !== token) {
      throw new BadRequestError(
        "for your security purposes please reset again"
      );
    }

    if (!user)
      throw new BadRequestError({ error: "Email or reset code is invalid !" });

    if (password !== passwordConfirm)
      throw new BadRequestError("Password do not match !");

    const hashedPassword = await hashPassword(password);

    await User.findOneAndUpdate(
      { email: user.email },
      { password: hashedPassword, resetCode: "", resetPasswordLink: "" }
    );

    res.status(OK).json({
      msg: "Password Successfully changed !"
    });
  } else
    throw UnauthorizedError("Something went totally wrong please try again");
};
