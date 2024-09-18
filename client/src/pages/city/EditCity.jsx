import React, { useState, useEffect } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCities } from '../../features/citySlice.js'; 
import toast from 'react-hot-toast';

const EditCity = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cities = useSelector((state) => state.city.cities); 
  const states = useSelector((state) => state.state.states); 

  const [cityName, setCityName] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [status, setStatus] = useState('Active');
  useEffect(() => {
    const currentCity = cities.find((city) => city._id === id);
    if (currentCity) {
      setCityName(currentCity.cityName);
      setCityCode(currentCity.cityCode);
      setSelectedState(currentCity.stateId); 
      setStatus(currentCity.status); 
    }
  }, [id, cities]);


  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/cities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityName,
          cityCode,
          stateId: selectedState,
          cityStatus: status,
        }),
      });
      console.log(selectedState);
      console.log(status);



      if (res.ok) {
        const updatedCity = await res.json();

        const updatedCities = cities.map((city) =>
          city._id === updatedCity._id ? updatedCity : city
        );

        dispatch(setCities(updatedCities));
        toast.success('City updated successfully')
        navigate('/city');
      } else {
        throw new Error('Failed to update city');
      }
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };


  return (
    <>
      <div>
        <div className='flex items-center gap-6'>
          <button onClick={() => navigate(-1)}>
            <MdKeyboardBackspace fontSize={30} />
          </button>
          <h2 className='text-2xl text-black font-bold'>Edit City</h2>
        </div>

        <div className='flex justify-start items-center gap-3 mt-10'>
          <input
            type="text"
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='City Name'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <input
            type="text"
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none'
            placeholder='City Code'
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
          />

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] rounded-lg py-1 px-2 outline-none text-[#9D9D9D]'
          >
            <option value="" disabled>Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.stateName}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-start items-center gap-3 mt-4'>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-[317px] h-[45px] border-[1px] border-[#9F9F9F] text-[#9D9D9D] rounded-lg py-1 px-2 outline-none'
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <button
          className='text-xl rounded-[25px] text-[#9D9D9D] h-[51px] w-[176px] border-[1px]'
          onClick={() => navigate('/city')}
        >
          Cancel
        </button>
        <button
          className='text-xl rounded-[25px] bg-[#662671] h-[51px] w-[176px] text-white'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditCity;
