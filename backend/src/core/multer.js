import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the uploads directory inside the src folder
const uploadDir = path.resolve('src', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Store files inside src/uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Initialize multer with storage and fileFilter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

export default upload;
