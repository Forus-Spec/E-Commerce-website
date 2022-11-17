import slugify from "slugify";
import Brand from "../models/Brand.js";
import { OK } from "../Utils/statusCodes.js";

export const createBrand = async (req, res) => {
  const slug = slugify(req.body.name);
  req.body.slug = slug;
  const brand = await new Brand(req.body).save();
  res.status(OK).json({ brand });
};

export const getBrands = async (req, res) => {
  const brands = await Brand.find({}).lean();
  res.status(OK).json({ brands });
};

export const getBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.brandId).lean();
  res.status(OK).json(brand);
};

export const updateBrand = async (req, res) => {
  const updateObject = req.body;
  const slug = res.params.slug;
  const updated = await Brand.findOneAndUpdate({ slug }, updateObject, {
    new: true
  }).exec();
  res.status(OK).json({
    data: updated,
    message: "Updated Successfully"
  });
};

export const deleteBrand = async (req, res) => {
  const slug = req.params.slug;
  await Brand.findOneAndRemove({ slug }).exec();
  res.status(OK).json({
    msg: `${req.params.slug} Successfully deleted`,
    data: slug
  });
};
