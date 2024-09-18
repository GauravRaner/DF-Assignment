import express from 'express';
import Wearhouse from '../models/wearhouseModel.js'; // Make sure to adjust the import path
import mongoose from 'mongoose';

const router = express.Router();

// Create a new city
router.post('/', async (req, res) => {
  const { wearhouseName, cityName, stateName } = req.body; // Ensure you include the necessary fields
  try {
    const wearhouse = new Wearhouse({ wearhouseName, cityName, stateName });
    const savedWearhouse = await wearhouse.save();
    res.status(201).json(savedWearhouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cities
router.get('/', async (req, res) => {
  try {
    const wearhouses = await Wearhouse.find();
    res.json(wearhouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a city
router.delete('/:id', async (req, res) => {
  const wearhouseId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(wearhouseId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const deleteWearhouse = await Wearhouse.findByIdAndDelete(wearhouseId);

  if (!deleteWearhouse) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.status(200).json({ message: 'City deleted successfully' });
});

export default router;
