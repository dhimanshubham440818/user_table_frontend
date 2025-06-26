import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to User Dashboard</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;