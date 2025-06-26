import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DataTable from '../components/dashboard/DataTable';
import { getData, deleteData } from '../services/data.service';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      debugger
      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable data={data} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;