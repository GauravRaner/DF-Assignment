import express from 'express';
import State from '../models/stateModel.js';
import mongoose from 'mongoose';
const router = express.Router();


router.post('/', async (req, res) => {
  const { stateName, stateCode } = req.body;
  try {
    const lastState = await State.findOne().sort({ stateId: -1 });
    const newStateId = lastState && lastState.stateId ? lastState.stateId + 1 : 121;
    const state = new State({ stateName, stateCode, stateId: newStateId, stateStatus: "Active" });
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const stateId = req.params.id


  if (!mongoose.Types.ObjectId.isValid(stateId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const deleteState = await State.findByIdAndDelete(stateId)

  if (!deleteState) return res.status(400).json({ msg: "state not found" })

  res.status(200).json({ msg: "state deleted successfully" })
})


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { stateName, stateCode, stateStatus } = req.body;

  try {
    const updatedState = await State.findByIdAndUpdate(
      id,
      { stateName, stateCode, stateStatus },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json(updatedState);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
