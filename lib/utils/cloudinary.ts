import { v2 as cloudinary } from "cloudinary";
const cloudinaryName = "diualhfb4";
const cloudinaryKey = "598574485938998";
const cloudinarySecret = "99Zwf5AQRh5ZRJ-iaDtNRKuif9M";

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

export default cloudinary;
