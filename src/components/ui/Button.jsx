const Button = ({ children, type = 'button', loading = false, className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;