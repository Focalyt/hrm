const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'employee_files', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
