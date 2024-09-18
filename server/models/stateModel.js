import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
  stateId:{
    type:Number,
    required:true
  },
  stateName: {
    type: String,
    required: true, 
  },
  stateCode: {
    type: String,
    required: true, 
  },
  stateStatus:{
    type:String,
    
  }
});

const State = mongoose.model('State', stateSchema);
export default State;
