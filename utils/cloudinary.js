import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (file) =>
  cloudinary.uploader.upload(file);

// cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

export default cloudinary;
