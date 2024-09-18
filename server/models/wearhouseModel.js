import mongoose from 'mongoose';

const wearhouseSchema = new mongoose.Schema({
  wearhouseName: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true, // Ensure this matches your validation requirements
  },
});

const Wearhouse = mongoose.model('Wearhouse', wearhouseSchema);
export default Wearhouse;
