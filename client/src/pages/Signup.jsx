import React, { useState } from 'react';
import logo from '../assets/logo.png';
import bg from '../assets/bg.png';
import subbg from '../assets/subbg.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);


      if (response.ok) {
        toast.success('Signup successfull')
        navigate('/login');
      } else {
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div
      className="w-[1440px] h-[1024px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${subbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="flex flex-col items-center p-8 rounded-lg w-full h-full bg-white"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 h-[802px] w-[660px] bg-[#ffffff] p-10 mt-28 rounded-md border-[#9F9F9F]"
          style={{ transform: 'translateX(-260px)' }}
        >
          <div className="mb-10 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-[124px] w-[238px]" />
            <p>Welcome to Digitalflake Admin</p>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border text-xl border-gray-300 w-[530px] h-[74px] bg-white outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border text-xl border-gray-300 w-[530px] h-[74px] bg-white outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="p-3 bg-[#662671] h-[58px] w-[530px] text-2xl mt-36 text-white rounded-md hover:bg-purple-800 transition-colors"
          >
            Sign Up
          </button>
          <div className="w-[530px] flex justify-center">
            <p className="text-black cursor-pointer">
              Already have an account?{' '}
              <Link to="/login">
                <span className="text-[#662671]">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
