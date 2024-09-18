import { createSlice } from '@reduxjs/toolkit';

const citySlice = createSlice({
  name: 'city',
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCities: (state, action) => {
      // Check if action.payload is an array
      if (Array.isArray(action.payload)) {
        state.cities = action.payload.map((city, index) => ({
          ...city,
          cityId: index + 121, // Set ID starting from 121
          status: 'Active', // Set default status to Active
        }));
      } else {
        console.error("Payload is not an array:", action.payload);
      }
    },
    addCity: (state, action) => {
      const newCity = {
        ...action.payload,
        status: 'Active', // Set initial status to Active
      };
      state.cities.push(newCity);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((s) => s._id !== action.payload);  // Filter by _id
    },
  },
});

export const { setCities, addCity, setLoading, setError, deleteCity } = citySlice.actions; 
export default citySlice.reducer;
