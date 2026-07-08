const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: "eshop",           // all uploads go into an "eshop" folder in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    }),
});

exports.upload = multer({ storage });