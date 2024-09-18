import { FaRegUserCircle } from "react-icons/fa";
import navlogo from "../assets/navlogo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {

    localStorage.removeItem('token');
    toast.success('Logout successfull')
    navigate('/');

  };

  return (
    <nav
      className="h-[104px] max-w-[1440px] bg-[#662671] flex justify-between items-center px-6 
      lg:px-8 md:px-6 sm:px-4"
    >
      <img
        src={navlogo}
        alt="Logo"
        className="h- w-[240px] lg:w-[180px] md:w-[160px] sm:w-[140px]"
      />

      <FaRegUserCircle
        className="text-white lg:text-5xl md:text-4xl sm:text-3xl text-2xl"
        onClick={handleLogout}
      />
    </nav>
  );
};

export default Header;
