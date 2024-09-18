import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addState } from '../../features/stateSlice';
import { toast } from 'react-hot-toast';
import {Link} from 'react-router-dom'

const AddState = () => {
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const dispatch = useDispatch();

  const handleAddState = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stateName, stateCode }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addState(data));
        toast.success('State added successfully');
        setStateName('');
        setStateCode('');
      } else {
        const errorData = await response.json();
        console.error('Error adding state:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 sm:p-6">
      <div>
        <div className="flex items-center gap-6 mb-4">
        <Link to='/state'><p className='text-3xl'>←</p></Link>
          <h2 className="text-2xl text-black font-bold">Add State</h2>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-3 mt-10">
          <input
            type="text"
            className="w-full md:w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none"
            placeholder="State Name"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full md:w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none"
            placeholder="State Code"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6 sm:flex-row justify-end">
        <button
          type="button"
          className="text-xl rounded-[25px] text-[#9D9D9D] h-[45px] w-full sm:w-[176px] border-[1px]"
          onClick={() => {
            setStateName('');
            setStateCode('');
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-xl rounded-[25px] bg-[#662671] h-[45px] w-full sm:w-[176px] text-white"
          onClick={handleAddState}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddState;
