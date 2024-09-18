import React, { useState } from 'react';
import logo from '../assets/logo.png';
import bg from '../assets/bg.png';
import subbg from '../assets/subbg.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.')
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      toast.success('Login successfull')
      navigate('/home'); // Redirect to dashboard or home page after login
    } catch (err) {
      toast.error('Invalid credentials')
    }
  };

  return (
    <div
      className=" w-[1440px] h-[1024px] flex items-center justify-center"
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
          className="flex flex-col justify-center items-center gap-4 h-[802px] w-[660px] bg-[#ffffff] p-10 mt-28 rounded-md border-[#9F9F9F]"
          onSubmit={handleSubmit}
          style={{ transform: 'translateX(-260px)' }}
        >
          <div className="mb-10 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-[124px] w-[238px]" />
            <p>Welcome to Digitalflake Admin</p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md border border-gray-300 w-[530px] h-[74px] text-xl bg-white outline-none focus:border-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border text-xl border-gray-300 w-[530px] h-[74px] bg-white outline-none focus:border-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-[530px] flex justify-end">
            <p className="text-[#5C218B] cursor-pointer">Forgot Password?</p>
          </div>

          <button
            type="submit"
            className="p-3 bg-[#662671] h-[58px] w-[530px] text-2xl mt-32 text-white rounded-md hover:bg-purple-800 transition-colors"
          >
            Login
          </button>

          <div className="w-[530px] flex justify-center">
            <p className="text-black cursor-pointer">
              Don't have an account?{' '}
              <Link to="/signup">
                <span className="text-[#662671]">Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
