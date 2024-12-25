import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser } from '../features/auth/authSlice';
import { LoginForm } from '../components/auth/LoginForm';
import { LoginFormData } from '../types/auth.types';
import Nav from '../components/UI/Nav';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, user, token, error } = useAppSelector((state) => state.auth); // Redux state


  // Handle user redirection based on their role after login
  useEffect(() => {
    if (user && token) {
      if (user.role === 'Farmer') {
        navigate('/farmer-dashboard');
      } else if (user.role === 'Buyer') {
        navigate('/buyer-dashboard');
      } else if (user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, token, navigate]);


  // Handle login form submission
  const handleSubmit = async (formData: LoginFormData) => {
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      // No need for additional navigation as useEffect handles it
    } else {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      {/* Nav Component */}
      <Nav />

      <div className="bg-harvest-lightgray">
        <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center px-2 md:px-4 lg:px-6 xl:px-8">
          <div className="w-full max-w-md">
            <LoginForm loading={loading} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
