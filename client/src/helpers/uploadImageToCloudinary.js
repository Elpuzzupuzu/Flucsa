import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dbogpb2mz",
  api_key: "277444742892654",
  api_secret: "Rbn3Q-xR7t38fMydSvar9RbVNuw"
});

export default async function uploadImageToCloudinary(file) {
  const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
  return result.secure_url;
}
