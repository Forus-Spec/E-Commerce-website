import Category from "../models/Category.js";
import slugify from "slugify";
import { OK } from "../Utils/statusCodes.js";

//this is our createCategory functionality which is amazing and awesome
export const createCategory = async (req, res) => {
  const slug = slugify(req.body.name);
  req.body.slug = slug;
  const newCategory = await new Category(req.body).save();
  res.status(OK).json({ newCategory });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find({}).lean();
  res.status(OK).json({ categories });
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId).lean();
  res.status(OK).json(category);
};

export const updateCategory = async (req, res) => {
  const updateObject = req.body;
  const slug = req.params.slug;
  const updated = await Category.findOneAndUpdate({ slug }, updateObject, {
    new: true
  });
  res.status(OK).json({
    data: updated,
    message: `Category updated successfully to ${updated.name}`
  });
};

export const deleteCategory = async (req, res) => {
  //  || req.params.name.replace(/\s/g, "")
  const slug = req.params.slug;
  await Category.findOneAndRemove({ slug }).exec();
  res.status(OK).json({
    msg: `Successfully deleted `,
    data: slug
  });
};
