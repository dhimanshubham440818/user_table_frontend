import { useState } from 'react';

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    if (!validationRules[name]) return null;
    
    const rules = validationRules[name];
    if (rules.required && !value) {
      return rules.message?.required || 'This field is required';
    }
    if (rules.minLength && value.length < rules.minLength) {
      return rules.message?.minLength || `Must be at least ${rules.minLength} characters`;
    }
    if (rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return rules.message?.isEmail || 'Invalid email format';
    }
    if (rules.matches && !rules.matches(value, values)) {
      return rules.message?.matches || 'Values do not match';
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, values[name])
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach(name => {
      newErrors[name] = validateField(name, values[name]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  };
};

export default useForm;