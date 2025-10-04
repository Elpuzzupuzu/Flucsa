import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name : "dbogpb2mz",
    api_key : "277444742892654",
    api_secret : "Rbn3Q-xR7t38fMydSvar9RbVNuw"
});

const storage = new multer.memoryStorage();

// Change function name to match the import alias and use export default
export default async function uploadImageToCloudinary(file) {
    console.log("Subiendo imagen a Cloudinary:", file.slice(0, 20) + "..."); 

    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    });

    // You probably want to return the secure URL, not the whole result object
    return result.secure_url;
}

// Note: The 'upload' multer middleware is likely not needed in the frontend/client component
// If you still need to export 'upload', you would use a named export:
// export const upload = multer({storage});