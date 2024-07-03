import multer from 'multer';

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
  // Accept image files only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Please upload an image'), false);
  }
  cb(null, true);
};

// Initialize multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB limit
  },
  fileFilter: fileFilter
});

export default upload;
