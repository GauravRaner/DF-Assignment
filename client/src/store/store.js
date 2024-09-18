import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '../features/stateSlice.js';
import cityReducer from '../features/citySlice.js'
import wearhouseReducer from '../features/wearhouseSlice.js'
import userReducer from '../features/userSlice.js'

const store = configureStore({
  reducer: {
    state: stateReducer,
    city:cityReducer,
    wearhouse:wearhouseReducer,
    user:userReducer,
  },
});

export default store;
