import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signupUser } from "../features/auth/authSlice";
import { SignupForm } from "../components/auth/SignupForm";
import { SignupFormData } from "../types/auth.types";
import Nav from "../components/UI/Nav";

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    role: "",
    phoneNo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Nav Component */}
      <Nav />

      <div className="bg-harvest-lightgray">
        <div className="max-w-7xl mx-auto h-screen flex items-center justify-center px-2 md:px-4 lg:px-6 xl:px-8">
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;