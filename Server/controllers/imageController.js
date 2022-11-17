import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// This is our upload functionality which is huge and awesome
export const upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto"
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url
  });
};
// This is our awesome remove functionality which is amazing and awesome
export const remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, () => res.status(200).json(image_id));
};
