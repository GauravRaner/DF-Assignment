import logo from '../assets/logo.png';

const Home = () => {
  return (
    <main className="flex items-center justify-center min-h-full">
      <div className="flex flex-col justify-center items-center">
        <img src={logo} alt="Logo" className="w-[276px] h-[150px]" />
        <p>Welcome to Digitalflake admin</p>
      </div>
    </main>
  );
};

export default Home;
