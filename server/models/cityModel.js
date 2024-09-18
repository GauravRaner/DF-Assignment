import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  cityId:{
    type:Number,
    required:true
  },
  cityName: {
    type: String,
    required: true, // Ensure this matches your validation requirements
  },
  cityCode:{
    type:String,
    required:true
  },
  stateName: {
    type: String,
    required: true, // Ensure this matches your validation requirements
  },
  cityStatus:{
    type:String,
    
  }
});

const City = mongoose.model('City', citySchema);
export default City;
