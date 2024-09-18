import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../../features/citySlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AddCity = () => {
  const [cityName, setCityName] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const dispatch = useDispatch();
  const states = useSelector((state) => state.state.states);

  const handleAddCity = async () => {
    if (!cityName || !cityCode || !selectedState) {
      console.error('All fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityName, cityCode, stateName: selectedState }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addCity(data));
        toast.success('City added successfully');
        setCityName('');
        setCityCode('');
        setSelectedState('');
      } else {
        const errorData = await response.json();
        console.error('Error adding city:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='p-4 md:p-8'>
        <div className='flex items-center gap-6'>
        <Link to='/city'><p className='text-3xl'>←</p></Link>
          <h2 className='text-2xl text-black font-bold'>Add City</h2>
        </div>

        <div className='flex flex-col md:flex-row justify-start items-center gap-3 mt-10'>
          <input
            type='text'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className='w-full md:w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='City Name'
          />
          <input
            type='text'
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            className='w-full md:w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='City Code'
          />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className='w-full md:w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value='' disabled>
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

      <div className='flex flex-col md:flex-row justify-end gap-2 mt-4 p-4 md:p-8'>
        <button className='text-xl rounded-[25px] text-[#9D9D9D] h-[51px] w-full md:w-[176px] border-[1px]'>
          Cancel
        </button>
        <button
          onClick={handleAddCity}
          className='text-xl rounded-[25px] bg-[#662671] h-[51px] w-full md:w-[176px] text-white'
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AddCity;
