import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DataTable from '../components/dashboard/DataTable';
import { getData, deleteData, addUserData } from '../services/data.service';
import { useNavigate } from 'react-router-dom';
import AddDataForm from '../components/dashboard/AddDataForm';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AddData = () => {
const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addUserData({
        ...formData,
        userId: user._id 
      });
      toast.success('Data added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add data');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Data</h1>
        <p className="mt-2 text-gray-600">Fill in the details below to create a new record</p>
      </div>
          {loading ? (
          <p>Loading...</p>
        ) : (
          <AddDataForm navigate={navigate} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} formData={formData}/>
        )}
      </div>
    </div>
  );
};

export default AddData;