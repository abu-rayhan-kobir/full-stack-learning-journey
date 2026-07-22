import multer from "multer";
import type { FileFilterCallback, StorageEngine } from "multer";
import type {Request} from "express";


const storage: StorageEngine = multer.diskStorage({
  destination:(
    request: Request,
    file: Express.Multer.File,
    callback
  ) => {
    callback(null, "public/temp/");
  },
  filename: (
    request: Request,
    file: Express.Multer.File,
    callback
  ) => {
    const modifiedFileName = `${Date.now()}-${file.originalname}`;
    callback(null, modifiedFileName);
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const allowedMimeTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Only JPEG, JPG, PNG and WEBP images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 1,
  }
});

export default upload;