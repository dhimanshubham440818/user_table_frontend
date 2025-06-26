import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AddDataForm = ({ navigate, handleChange, handleSubmit, loading, formData, errors }) => {
  const [touched, setTouched] = useState({
    title: false,
    description: false
  });

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur('title')}
          required
          minLength={3}
          error={touched.title && errors?.title}
          placeholder="Enter a descriptive title"
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        />
        
        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          onBlur={handleBlur('description')}
          as="textarea"
          rows={5}
          error={touched.description && errors?.description}
          placeholder="Provide detailed information about this record"
          className="min-h-[120px]"
        />
        
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            loading={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Data'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDataForm;