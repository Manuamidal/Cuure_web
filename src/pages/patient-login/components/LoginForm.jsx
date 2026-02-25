import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    email: 'patient@healthcare.com',
    phone: '+1-555-0123',
    password: 'Patient@123'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isValidEmail = formData?.emailOrPhone === mockCredentials?.email;
      const isValidPhone = formData?.emailOrPhone === mockCredentials?.phone;
      const isValidPassword = formData?.password === mockCredentials?.password;

      if ((isValidEmail || isValidPhone) && isValidPassword) {
        navigate('/patient-dashboard');
      } else {
        setErrors({
          emailOrPhone: 'Invalid credentials. Please use:\nEmail: patient@healthcare.com or Phone: +1-555-0123\nPassword: Patient@123'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-24">
      <div>
        <Input
          label="Email or Phone Number"
          type="text"
          name="emailOrPhone"
          placeholder="Enter your email or phone number"
          value={formData?.emailOrPhone}
          onChange={handleInputChange}
          error={errors?.emailOrPhone}
          required
          disabled={isLoading}
        />
      </div>
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember Me"
          checked={formData?.rememberMe}
          onChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;