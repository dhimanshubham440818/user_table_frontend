import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();

  const handleSuccess = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    
    // Verify the decoded token contains required fields
    if (!decoded.email || !decoded.email_verified) {
      throw new Error('Google account email not verified');
    }

    const response = await googleLogin({
      token: credentialResponse.credential, // The JWT ID token
      email: decoded.email,
      name: decoded.name || decoded.given_name // Fallback to given_name if name not available
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    toast.success('Google login successful!');
    // Handle successful login (redirect, store token, etc.)
  } catch (error) {
    toast.error(error.message || 'Google login failed');
    console.error('Google login error:', error);
  }
};

  return (
    <div className="mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error('Google login failed')}
        useOneTap
        auto_select
        shape="rectangular"
        size="large"
        text="continue_with"
        theme="filled_blue"
      />
    </div>
  );
};

export default GoogleLoginButton;