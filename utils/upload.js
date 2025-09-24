import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // save inside /uploads folder
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
	},
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png|webp/;
	const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed (jpg, jpeg, png, webp)"));
	}
};

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
	fileFilter,
});

export default upload;
