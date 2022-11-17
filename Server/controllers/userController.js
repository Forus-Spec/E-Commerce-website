import jwtDecode from "jwt-decode";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import {
  BadRequestError,
  Forbidden,
  UnauthorizedError
} from "../Utils/APIError.js";

import {
  createToken,
  hashPassword,
  verifyPassword
} from "../Utils/authUtils.js";

import { upload } from "../Utils/imageUtil.js";
import { OK } from "../Utils/statusCodes.js";

export const uploadUserPhoto = upload.single("photo");
export const createUser = async (req, res) => {
  const { firstName, lastName, email, country, city, phone, password, role } =
    req.body;

  if (!email || !firstName || !lastName || !country || !city || !phone)
    throw new BadRequestError("Would you Please provide all values");

  const userExists = await User.findOne({ email }).lean();

  if (userExists) throw new BadRequestError("This user already exists");

  const hashedPassword = await hashPassword(password);
  const user = await new User({ ...req.body, password: hashedPassword }).save();

  if (user) {
    const token = createToken(user);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;
    const { firstName, lastName, email, country, city } = user;
    const userInfo = {
      firstName,
      lastName,
      email,
      location: { country, city }
    };
    res.status(OK).json({
      message: `User successfully created role:${role}`,
      userInfo,
      token,
      expiresAt
    });
  } else {
    throw new Forbidden("Something went totally wrong please try again later");
  }
};
export const getUser = async (req, res) => {
  const userId = req.params.id;
  const userInfo = await User.findById(userId).lean();
  if (!userInfo) throw new BadRequestError("This is user does not exist");
  res.status(OK).json({
    message: "User fetched successfully! which is amazing",
    data: userInfo
  });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findOneAndDelete({ _id: userId });
  res.status(OK).json({
    message: "User has been successfully deleted",
    data: null
  });
};
export const getUsers = async (req, res) => {
  const users = await User.findAll({}).lean();
  res.status(OK).json({
    message: "Users fetched successfully",
    data: users
  });
};
export const updateUser = async (req, res) => {
  const { firstName, lastName, email, country, city, phone } = req.body;
  if (!email || !firstName || !lastName || !city || !country || !phone)
    throw new BadRequestError("Would you Please provide all values");

  if (req.file) req.body.photo = req.file.filename;

  const updateUser = {
    firstName,
    lastName,
    email,
    city,
    country,
    phone
  };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateUser, {
    new: true,
    runValidators: true
  });
  if (updatedUser) {
    const token = createToken(updatedUser);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    res.status(OK).json({
      message: "successfully updated",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        location: {
          country: updatedUser.country,
          city: updatedUser.city
        }
      },
      token,
      expiresAt
    });
  }
};

export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword, passwordConfirm, email } = req.body;

  if (!oldPassword || !newPassword)
    throw new BadRequestError("Please provide both values");

  let user = await User.findOne({ email }).lean().select("+password");

  const isPasswordCorrect = await verifyPassword(oldPassword, user.password);
  if (!isPasswordCorrect) throw new UnauthorizedError("Invalid Credentials");

  if (newPassword !== passwordConfirm) {
    throw new BadRequestError("password confirm sadly do not match ");
  }

  const hashedPassword = await hashPassword(newPassword);

  await User.updateOne(
    { email: user.email },
    { $set: { password: `${hashedPassword}` } }
  );
  res.status(OK).json({
    msg: "Success! Password has been  Updated "
  });
};

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  console.log(productId);
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

// this is our wishlist functionality which is amazing and awesome
export const wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();
  res.json(list);
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

export const userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).lean().exec();
  let cartExist = await Cart.findOne({ orderBy: user._id }).lean().exec();
  if (cartExist) {
    cartExist.remove();
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;

    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;
    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderBy: user._id
  }).save();

  console.log(newCart);

  res.status(OK).json({
    message: "Cart has been created successfully ! ",
    ok: true
  });
};

export const getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOne({ orderBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  const data = {
    products,
    cartTotal,
    totalAfterDiscount
  };

  res.status(OK).json({
    data,
    message: "Cart fetched successfully"
  });
};

export const emptyUserCart = async (req, res) => {
  const user = await User.findOne({
    email: req.user.email
  }).exec();

  const cart = await Cart.findOneAndRemove({
    orderedBy: user._id
  }).exec();

  res.json(cart);
};

export const createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).lean().exec();
  let { products } = await Cart.findOne({ orderedBy: user._id }).lean().exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id
  }).save();

  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: {
          $inc: {
            quantity: -item.count,
            sold: +item.count
          }
        }
      }
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log(updated);
  res.status(OK).json({
    data: newOrder,
    response: true,
    message: "Order successfully saved"
  });
};

export const getOrders = async (req, res) => {
  let user = await User.findOne({
    email: req.user.email
  }).exec();

  let userOrders = await Order.find({
    orderBy: user._id
  })
    .populate("products.product")
    .exec();

  res.status(OK).json({
    message: "Orders successfully fetched",
    data: userOrders
  });
};

export const checkEmail = async (req, res) => {
  const ExistingEmail = await User.findOne({ email: req.body.email })
    .lean()
    .exec();

  if (ExistingEmail) throw new BadRequestError("Email already exists");

  res.status(OK).json({ data: true });
};
export const checkPhone = async (req, res) => {
  const ExistingEmail = await User.findOne({ phone: req.body.phone })
    .lean()
    .exec();

  if (ExistingEmail) throw new BadRequestError("Phone already exists");

  res.status(OK).json({ data: true });
};

// const getSingleUser = async (req, res) => {
//   const user = await User.findOne({ _id: req.params.id }).lean()
//   if (!user)
//     throw new NotFoundError(`No user with id : ${req.params.id}`);
//   checkPermissions(req.user, user._id);
//   res.status(StatusCodes.OK).json({ user });
// };
