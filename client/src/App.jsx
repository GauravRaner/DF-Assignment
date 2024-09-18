import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddState from './pages/state/AddState';
import State from './pages/state/State';
import EditState from './pages/state/EditState';
import City from './pages/city/City';
import AddCity from './pages/city/AddCity';
import EditCity from './pages/city/EditCity';
import Wearhouse from './pages/wearhouse/Wearhouse';
import AddWearhouse from './pages/wearhouse/AddWearhouse';
import EditWearhouse from './pages/wearhouse/EditWearhouse';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div className='max-w-[1440px] h-[1024px] mx-auto shadow-lg mt-[3%]'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          {/* Redirect to login if no other route matches */}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/home' element={<Layout><Home/></Layout>}/>
          <Route path='/state' element={<Layout><State /></Layout>} />
          <Route path='/addState' element={<Layout><AddState /></Layout>} />
          <Route path='/editState/:id' element={<Layout><EditState /></Layout>} />
          <Route path='/city' element={<Layout><City /></Layout>} />
          <Route path='/addCity' element={<Layout><AddCity /></Layout>} />
          <Route path='/editCity/:id' element={<Layout><EditCity /></Layout>} />
          <Route path='/wearhouse' element={<Layout><Wearhouse /></Layout>} />
          <Route path='/addWearhouse' element={<Layout><AddWearhouse /></Layout>} />
          <Route path='/editWearhouse/:id' element={<Layout><EditWearhouse /></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
