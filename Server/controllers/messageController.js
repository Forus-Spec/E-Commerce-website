import Message from "../models/Message.js";
import slugify from "slugify";
import { BadRequestError } from "../Utils/APIError.js";
import { OK } from "../Utils/statusCodes.js";

export const createMessage = async (req, res) => {
  const { name, email, orderNo, message } = req.body;

  if (!name || !email || !orderNo || !message)
    throw new BadRequestError("Would Please provide all values");

  const slug = slugify(req.body.name);
  req.body.slug = slug;
  const newMessage = await new Message(req.body).save();
  res.status(OK).json({
    message:
      "Message Has been sent successfully we will contact as soon as possible",
    data: newMessage,
  });
};

export const getMessages = async (req, res) => {
  const categories = await Message.find({}).lean();
  res.status(OK).json({
    data: categories,
  });
};

export const deleteMessage = async (req, res) => {
  const slug = req.params.slug || req.params.name.replace(/\s/g, "");
  await Message.findOneAndRemove({ slug }).exec();
  res.status(OK).json({
    message: `Successfully deleted `,
    data: null,
  });
};
