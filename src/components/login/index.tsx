/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { postApi } from '../../apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LoginComponent: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loggedinUser = await postApi(`/auth/login`, formData);

      if (loggedinUser?.status === 200) {
        localStorage.setItem('accessToken', loggedinUser?.data?.data?.accessToken);
        navigate("/", { replace: true });
      }

      toast.success("User logged in successfully");
    }
    catch (e: any) {
      console.log("🚀 ~ handleSubmit ~ e:", e)
      toast.error("fail to login, check your credentials")
    }
    finally {
      setLoading(false);
      setFormData({ email: '', password: '' })
    }

  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-16 bg-white rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-center mb-10">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-2xl font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-4 p-5 w-full text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-10">
            <label className="block text-2xl font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-4 p-5 w-full text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <label className="inline-flex items-center text-xl text-gray-600">
              <input type="checkbox" className="form-checkbox w-6 h-6" name="remember" />
              <span className="ml-4">Remember me</span>
            </label>
          </div>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="w-full py-5 text-2xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
  
  
};

export default LoginComponent;
