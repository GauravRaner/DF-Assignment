import { createSlice } from '@reduxjs/toolkit';

const wearhouseSlice = createSlice({
  name: 'wearhouse',
  initialState: {
    wearhouses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWearhouses: (state, action) => {
      state.wearhouses = action.payload.map((wearhouse, index) => ({
        ...wearhouse,
        _id: wearhouse._id, // Use MongoDB generated ID
        wearhouseId: index + 101, // Set cityId starting from 1001 or any desired number
        status: 'Active', // Set default status to Active
      }));
    },
    addWearhouse: (state, action) => {
      state.wearhouses.push(action.payload); // Add the new city to the cities array
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteWearhouse: (state, action) => {
      state.wearhouses = state.wearhouses.filter((c) => c._id !== action.payload); // Filter by _id
    },
  },
});

export const { setWearhouses, addWearhouse, setLoading, setError, deleteWearhouse } = wearhouseSlice.actions; // Export the actions
export default wearhouseSlice.reducer;
