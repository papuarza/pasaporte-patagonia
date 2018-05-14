require('dotenv').config();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'bud-landing',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    let fileTitle = `${req.body.name}${file.originalname}`
    cb(null, fileTitle);
  }
});

const uploadCloud = multer({storage, limits: { fileSize: 10000000 }});
module.exports = uploadCloud;