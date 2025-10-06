import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dbogpb2mz",
  api_key: "277444742892654",
  api_secret: "Rbn3Q-xR7t38fMydSvar9RbVNuw",
});

export default async function uploadImageToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
    console.log("✅ Cloudinary upload success:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    throw new Error("Error subiendo imagen a Cloudinary");
  }
}
