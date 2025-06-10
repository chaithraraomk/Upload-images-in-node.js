const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// 🚀 SINGLE upload (already working)
router.post('/upload', upload.single('image'), imageController.uploadImage);

router.get('/images', imageController.getAllImages);
// ✅ MULTIPLE upload (NEW)
router.post('/upload-multiple', upload.array('images', 5), imageController.uploadMultipleImages);

module.exports = router;
