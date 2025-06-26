import useForm from '../../hooks/useForm';
import Input from '../ui/Input';
import Button from '../ui/Button';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, isLoading }) => {
  const { values, errors, touched, handleChange, handleBlur } = useForm({
    email: '',
    password: ''
  }, {
    email: { required: true, isEmail: true },
    password: { required: true, minLength: 6 }
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 sm:p-8">
      <form 
        onSubmit={(e) => { e.preventDefault(); onSubmit(values); }} 
        className="space-y-6"
      >
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          placeholder="Enter your password"
        />
        
        <Button 
          type="submit" 
          loading={isLoading} 
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-3">
          <GoogleLoginButton />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
        >
          Sign up now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;