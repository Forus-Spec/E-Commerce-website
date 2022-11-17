import User from "../models/User.js";
import Product from "../models/Product.js";
import slugify from "slugify";
import { OK } from "../Utils/statusCodes.js";
import { upload } from "../Utils/imageUtil.js";
import { BadRequestError } from "../Utils/APIError.js";

// this is our awesome uploadProduct images functionality which is huge and awesome
export const uploadProductImages = upload.array("images", 4);

export const createProduct = async (req, res) => {
  req.body.slug = slugify(req.body.name);

  const newProduct = await new Product(req.body).save();
  res.status(OK).json({
    message: "Product created successfully ✔️",
    data: newProduct
  });
};

export const getProducts = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category", "_id name")
    .populate("brand", "_id name")
    .sort([["createdAt", "desc"]])
    .lean()
    .exec();

  if (!products)
    throw new BadRequestError(
      "Something went wrong with fetching your products"
    );
  res.status(OK).json({ products });
};

export const getProduct = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("brand")
    .lean()
    .exec();

  res.status(OK).json(product);
};

export const updateProduct = async (req, res) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.images = req.file.filename;

  const updateObject = req.body;
  const slug = req.body.slug;
  const updated = await Product.findOneAndUpdate({ slug }, updateObject, {
    new: true,
    runValidators: true
  }).exec();
  res.status(OK).json({
    message: "product update successfully ",
    updated
  });
};

export const deleteProduct = async (req, res) => {
  const slug = req.params.slug;
  const result = await Product.findOneAndRemove({ slug }).exec();
  res.status(OK).json(result.public_id);
};

export const relatedProducts = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category
  })
    .limit(4)
    .populate("category")
    .populate("brand")
    .lean()
    .exec();

  res.Status(OK).json({ productDetail: product, related: related });
};

export const productCount = async (req, res) => {
  let total = await Product.count({});
  res.status(OK).json(total);
};

export const productStar = async (req, res) => {
  const _product = Product.findById(req.params.productId).lean().exec();
  const _user = User.findOne({ email: req.user.email }).lean().exec();
  const product = await _product;
  const user = await _user;
  const { star } = req.body;
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } }
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: {
          $elemMatch: existingRatingObject
        }
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    res.status(OK).json({
      message: "Thank you for your feedback ",
      ratingUpdated
    });
  }
};

export const listingProduct = async (req, res) => {
  const { sort, order, page } = req.query;
  const currentPage = page || 1;
  const perPage = 8;

  // This is our products functionality
  const products = await Product.find({})
    .skip((currentPage - 1) * perPage)
    .populate("category")
    .populate("brand")
    .sort([[sort, order]])
    .limit(perPage)
    .exec();
  res.json(products);
};

export const handleQuery = async (req, res) => {
  const query = req.params.query;
  const products = await Product.find({ $text: { $search: query } })
    .populate("category")
    .populate("brand")
    .exec();
  res.json(products);
};

export const handlePrice = async (req, res) => {
  const price = req.params.price;
  let products = await Product.find({
    price: {
      $gte: 0,
      $lte: price
    }
  })
    .populate("category")
    .populate("brand")
    .exec();
  res.json(products);
};

export const handleCategory = async (req, res) => {
  let products = await Product.find({ category: req.query.categories })
    .populate("category")
    .populate("brand")
    .exec();
  res.json(products);
};

export const handleBrand = async (req, res) => {
  const brand = req.params.brand;
  const products = await Product.find({ brand })
    .populate("category")
    .populate("brand")
    .exec();
  res.json(products);
};
