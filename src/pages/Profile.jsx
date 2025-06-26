import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { getData, deleteData } from '../services/data.service';
import ProfileCard from '../components/dashboard/ProfileCard';
import { getProfile } from '../services/auth.service';

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProfileCard user={data}  />
        )}
      </div>
    </div>
  );
};

export default Profile;