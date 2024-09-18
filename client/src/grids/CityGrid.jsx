import React, { useEffect } from 'react';
import dlt from '../assets/dlt.png';
import edit from '../assets/edit.png';
import { Link } from 'react-router-dom';
import { setCities, } from '../features/citySlice';
import { useDispatch, useSelector } from 'react-redux';
import {deleteCity} from '../features/citySlice.js'

const CityGrid = ({searchQuery}) => {
  const dispatch = useDispatch();
  const { cities, loading, error } = useSelector((state) => state.city);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/cities');
        const data = await res.json();

        // Ensure that data is in the expected format
        if (Array.isArray(data)) {
          dispatch(setCities(data));
        } else {
          console.error('Invalid data structure:', data);
          dispatch(setCities([])); // Set to an empty array if invalid
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        dispatch(setCities([])); // Reset cities on error
      }
    };

    getCities();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cities/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteCity(id));
      } else {
        console.error('Error deleting city');
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching cities: {error}</div>;

  return (
    <div className="max-w-[1440px] mx-auto mt-6">
      <div className="grid grid-cols-6 gap-4 text-center font-bold py-2 text-xl bg-[#FFF8B7]">
        <div>Id</div>
        <div>City Name</div>
        <div>City Code</div>
        <div>State Name</div>
        <div>Status</div>
        <div>Action</div>
      </div>
      {cities.length > 0 ? (
        filteredCities.map((row) => (
          <div key={row._id} className="grid grid-cols-6 gap-4 py-2 border-b text-lg bg-[#F2F2F2] mt-3">
            <div className="flex justify-center items-center">{row.cityId}</div>
            <div className="flex justify-center items-center">{row.cityName}</div>
            <div className="flex justify-center items-center">{row.cityCode}</div>
            <div className="flex justify-center items-center">{row.stateName}</div>
            <div className={`flex justify-center items-center ${row.cityStatus === 'Active' ? 'text-[#00A11A]' : 'text-[#F70505]'}`}>
              {row.status}
            </div>
            <div className="flex justify-center items-center gap-5">
              <Link to={`/editCity/${row._id}`}>
                <img src={edit} alt="Edit" className="w-4 h-4" />
              </Link>
              <button onClick={() => handleDelete(row._id)}>
                <img src={dlt} alt="Delete" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">No cities available.</div>
      )}
    </div>
  );
};

export default CityGrid;
