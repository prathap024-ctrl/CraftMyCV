import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "./public/uploads";

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  const isPDF = file.mimetype === "application/pdf";
  if (isPDF) cb(null, true);
  else cb(new Error("Only PDF files are allowed!"), false);
};

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// Export configured multer upload middleware
export const upload = multer({ storage, fileFilter });
