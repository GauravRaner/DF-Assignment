import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    states: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStates: (state, action) => {
      // Check if action.payload is an array
      if (Array.isArray(action.payload)) {
        state.states = action.payload.map((state, index) => ({
          ...state,
          stateId: index + 121, // Set ID starting from 121
          status: 'Active', // Set default status to Active
        }));
      } else {
        console.error("Payload is not an array:", action.payload);
      }
    },
    addState: (state, action) => {
      const newState = {
        ...action.payload,
        status: 'Active', // Set initial status to Active
      };
      state.states.push(newState);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteState: (state, action) => {
      state.states = state.states.filter((s) => s._id !== action.payload);  // Filter by _id
    },
  },
});

export const { setStates, addState, setLoading, setError, deleteState } = stateSlice.actions; 
export default stateSlice.reducer;
