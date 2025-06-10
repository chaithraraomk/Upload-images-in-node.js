const Image = require('../models/Image');

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newImage = new Image({
      name: req.body.name || 'Untitled',
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newImage.save();

    res.status(200).json({
      message: '✅ Image uploaded and saved to DB',
      imageUrl: newImage.imageUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images' });
  }
};

exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imagesToSave = req.files.map(file => ({
      name: file.originalname,
      imageUrl: `/uploads/${file.filename}`,
    }));

    const savedImages = await Image.insertMany(imagesToSave);

    res.status(200).json({
      message: '✅ Images uploaded and saved to DB',
      images: savedImages,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

