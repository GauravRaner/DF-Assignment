import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dlt from '../assets/dlt.png';
import edit from '../assets/edit.png';
import { Link } from 'react-router-dom';
import { setStates, deleteState } from '../features/stateSlice.js';

const StateGrid = ({ searchQuery }) => { // Accept searchQuery as a prop
  const dispatch = useDispatch();
  const states = useSelector((state) => state.state.states);

  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/states');
        const data = await res.json();
        dispatch(setStates(data));
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    getStates();
  }, [dispatch]);

  const handleDeleteState = async (_id) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/states/${_id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error deleting state: ${response.statusText}`);
        }

        dispatch(deleteState(_id));
        console.log('State deleted successfully');
      } catch (error) {
        console.error('Error deleting state:', error);
        alert('Failed to delete state. Please try again.');
      }
    }
  };

  // Filter states based on the search query
  const filteredStates = states.filter((state) =>
    state.stateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto mt-6">
      <div className="grid grid-cols-5 gap-4 text-center font-bold py-2 text-xl bg-[#FFF8B7]">
        <div>Id</div>
        <div>State Name</div>
        <div>State Code</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {filteredStates.map((row) => (
        <div key={row._id} className="grid grid-cols-5 gap-4 row gap-y-2 text-center py-2 border-b text-lg bg-[#F2F2F2] mt-2">
          <div>{row.stateId}</div>
          <div>{row.stateName}</div>
          <div>{row.stateCode}</div>
          <div className={`${row.stateStatus === 'Active' ? 'text-[#00A11A]' : 'text-[#F70505]'}`}>{row.stateStatus}</div>
          <div className='flex justify-center items-center gap-5'>
            <button>
              <Link to={`/editState/${row._id}`}>
                <img src={edit} alt="Edit" />
              </Link>
            </button>
            <button onClick={() => handleDeleteState(row._id)}>
              <img src={dlt} alt="Delete" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StateGrid;
