import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dlt from '../assets/dlt.png';
import edit from '../assets/edit.png';
import { Link } from 'react-router-dom';
import { deleteWearhouse, setWearhouses } from '../features/wearhouseSlice.js';

const WearhouseGrid = ({searchQuery}) => {
  const dispatch = useDispatch();
  const { wearhouses, loading, error } = useSelector((state) => state.wearhouse);

  useEffect(() => {
    const getWearhouses = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/wearhouses');
        const data = await res.json();

        // Ensure that data is in the expected format
        if (Array.isArray(data)) {
          dispatch(setWearhouses(data));
        } else {
          console.error('Invalid data structure:', data);
          dispatch(setWearhouses([])); // Set to an empty array if invalid
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        dispatch(setWearhouses([])); // Reset cities on error
      }
    };

    getWearhouses();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/wearhouses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteWearhouse(id));
      } else {
        console.error('Error deleting city');
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  
  const filteredWearhouses = wearhouses.filter((wearhouse) =>
    wearhouse.wearhouseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto mt-6">
      {/* Grid header */}
      <div className="grid grid-cols-6 gap-4 text-center font-bold py-2 text-xl bg-[#FFF8B7]">
        <div>Id</div>
        <div>Wearhouse Name</div>
        <div>City</div>
        <div>State</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* Grid rows */}
      {filteredWearhouses.map((row) => (
        <div
          key={row._id}
          className="grid grid-cols-6 gap-4 py-2 border-b text-lg bg-[#F2F2F2] hover:bg-[#EAEAEA] transition-colors duration-200 mt-3"
        >
          <div className="text-center">{row.wearhouseId}</div>
          <div className="text-center">{row.wearhouseName}</div>
          <div className="text-center">{row.cityName}</div>
          <div className="text-center">{row.stateName}</div>
          <div className={`text-center ${row.status === 'Active' ? 'text-[#00A11A]' : 'text-[#F70505]'}`}>
            {row.status}
          </div>
          <div className="flex justify-center items-center gap-3">
            <button className="hover:scale-110 transition-transform duration-200">
              <Link to={`/editwearhouse/${row._id}`}>
                <img src={edit} alt="Edit" className="w-5 h-5" />
              </Link>
            </button>
            <button
              className="hover:scale-110 transition-transform duration-200"
              onClick={() => handleDelete(row._id)}
            >
              <img src={dlt} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WearhouseGrid;
