import React, { useState } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";


const EditWearhouse = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [status, setStatus] = useState('');

  const states = [
    { id: 1, name: 'Maharashtra' },
    { id: 2, name: 'Telangana' },
    { id: 3, name: 'Gujarat' },
  ];

  const cities = [
    { id: 1, name: 'Mumbai' },
    { id: 2, name: 'Hyderabad' },
    { id: 3, name: 'Ahmedabad' },
  ];

  const statuses = ['Active', 'Inactive'];

  return (
    <>
      <div>
        <div className='flex items-center gap-6'>
          <p><MdKeyboardBackspace fontSize={30} />
          </p>
          <h2 className='text-2xl text-black font-bold'>Edit Warehouse</h2>
        </div>

        <div className='flex justify-start items-center gap-3 mt-10'>
          <input
            type="text"
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='Warehouse Name'
          />

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value="" disabled>Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value="" disabled>Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-start items-center gap-3 mt-4'>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value="" disabled>Select Status</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <button className='text-xl rounded-[25px] text-[#9D9D9D] h-[51px] w-[176px] border-[1px]'>
          Cancel
        </button>
        <button className='text-xl rounded-[25px] bg-[#662671] h-[51px] w-[176px] text-white'>
          Save
        </button>
      </div>
    </>
  );
};

export default EditWearhouse;
