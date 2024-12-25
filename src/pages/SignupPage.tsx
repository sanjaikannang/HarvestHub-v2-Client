import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signupUser } from '../features/auth/authSlice';
import { SignupForm } from '../components/auth/SignupForm';
import { SignupFormData } from '../types/auth.types';
import Nav from '../components/UI/Nav';

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth); // Get loading state from Redux


  // Handle form submission
  const handleSubmit = async (formData: SignupFormData) => {
    const result = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(result)) {
      navigate('/login'); // Redirect to login on successful signup
    }
  };

  return (
    <>
      {/* Nav Component */}
      <Nav />

      <div className="bg-harvest-lightgray py-10">
        <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center px-2 md:px-4 lg:px-6 xl:px-8">
          <div className="w-full max-w-md">
            <SignupForm loading={loading} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
