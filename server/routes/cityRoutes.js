import express from 'express';
import City from '../models/cityModel.js'; // Make sure to adjust the import path
import mongoose from 'mongoose';

const router = express.Router();

// Create a new city
router.post('/', async (req, res) => {
  const { cityName,cityCode,stateName, } = req.body;
  try {
   const lastCity = await City.findOne().sort({ cityId: -1 });
    const newCityId = lastCity && lastCity.cityId ? lastCity.cityId + 1 : 121;
    const city = new City({ cityName,cityCode,stateName,cityId: newCityId,cityStatus:"Active" });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a city
router.delete('/:id', async (req, res) => {
  const cityId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cityId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const deletedCity = await City.findByIdAndDelete(cityId);

  if (!deletedCity) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.status(200).json({ message: 'City deleted successfully' });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cityName,cityCode, cityStatus ,stateName} = req.body; // Update to match the request body

  console.log(stateName);
  
  try {
    const updatedCity = await City.findByIdAndUpdate(
      id, 
      {  cityName,cityCode, cityStatus ,stateName}, // Update field names to match the model
      { new: true } // Return the updated document
    );

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
