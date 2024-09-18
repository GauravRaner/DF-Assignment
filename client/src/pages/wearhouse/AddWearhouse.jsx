import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWearhouse } from '../../features/wearhouseSlice.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AddWearhouse = () => {
  const [wearhouseName, setWearhouseName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const dispatch = useDispatch();

  const states = useSelector((state) => state.state.states);
  const cities = useSelector((state) => state.city.cities);

  const handleAddWearhouse = async () => {
    if (!wearhouseName || !selectedCity || !selectedState) {
      console.error('All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/wearhouses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wearhouseName, cityName: selectedCity, stateName: selectedState }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addWearhouse(data));
        toast.success('Wearhouse added successfully');
        setWearhouseName('');
        setSelectedCity('');
        setSelectedState('');
      } else {
        const errorData = await response.json();
        console.error('Error adding wearhouse:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-8 lg:px-12">
        <div className='flex items-center gap-6'>
        <Link to='/wearhouse'><p className='text-3xl'>←</p></Link>
          <h2 className='text-xl md:text-2xl text-black font-bold'>Add Wearhouse</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          <input
            type="text"
            value={wearhouseName}
            onChange={(e) => setWearhouseName(e.target.value)}
            className='w-full h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='Wearhouse Name'
          />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className='w-full h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value="" disabled>Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.cityName}>{city.cityName}</option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]"
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state._id} value={state.stateName}>
                {state.stateName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-6 px-4 md:px-8 lg:px-12'>
        <button className='text-lg md:text-xl rounded-[25px] text-[#9D9D9D] h-[45px] w-[140px] md:h-[51px] md:w-[176px] border-[1px]'>Cancel</button>
        <button onClick={handleAddWearhouse} className='text-lg md:text-xl rounded-[25px] bg-[#662671] h-[45px] w-[140px] md:h-[51px] md:w-[176px] text-white'>Save</button>
      </div>
    </>
  );
};

export default AddWearhouse;
