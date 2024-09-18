import React, { useEffect, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStates } from '../../features/stateSlice.js';
import { toast } from 'react-hot-toast'

const EditState = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const states = useSelector((state) => state.state.states);
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    const currentState = states.find((state) => state._id === id);
    if (currentState) {
      setStateName(currentState.stateName);
      setStateCode(currentState.stateCode);
      setStatus(currentState.stateStatus);
    }
  }, [id, states]);

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/states/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stateName,
          stateCode,
          stateStatus: status,
        }),
      });

      if (res.ok) {
        const updatedState = await res.json();
        dispatch(setStates((prevStates) =>
          prevStates.map((state) =>
            state._id === updatedState._id ? updatedState : state
          )
        ));
        toast.success('State updated successfully')
        navigate('/state');
      } else {
        throw new Error('Failed to update state');
      }
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };


  return (
    <>
      <div>
        <div className="flex items-center gap-6">
          <p>
            <MdKeyboardBackspace fontSize={30} onClick={() => navigate(-1)} />
          </p>
          <h2 className="text-2xl text-black font-bold">Edit State</h2>
        </div>

        <div className="flex justify-start items-center gap-3 mt-10">
          <input
            type="text"
            className="w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none"
            placeholder="State Name"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <input
            type="text"
            className="w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none"
            placeholder="State Code"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
          <select
            className="w-[317px] h-[45px] border-[1px] border-[#9F9F9F] text-[#9D9D9D] rounded-lg py-1 px-2 outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="text-xl rounded-[25px] text-[#9D9D9D] h-[51px] w-[176px] border-[1px]"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="text-xl rounded-[25px] bg-[#662671] h-[51px] w-[176px] text-white"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditState;
