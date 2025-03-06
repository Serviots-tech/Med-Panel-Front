/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { postApi } from '../../apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import InputField from '../InputField';
import { hasFormError, invalidText, validateFormData } from '../../helpers/utils';

const LoginComponent: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState<any>({
    email: false,
    password: false,
  })

  const [hasError, setHasError] = useState(false);
  
  const handleSubmit = async () => {
    const checkFormError = validateFormData(
      {
        ...formData,
      },
      formError
    );
    setFormError(checkFormError);

    if (hasFormError(checkFormError)) {
      return;
    } else {
      try {
        setLoading(true);
        const loggedinUser = await postApi(`/auth/login`, formData);

        if (loggedinUser?.status === 200) {
          localStorage.setItem('accessToken', loggedinUser?.data?.data?.accessToken);
          navigate("/", { replace: true });
        }

        toast.success("User logged in successfully");
      }
      catch (error: any) {
        toast.error(error?.response?.data?.message  ||"fail to login, check your credentials")
      }
      finally {
        setLoading(false);
        setFormData({ email: '', password: '' })
      }
    }

  };

  const handleChangeValue = async (
    value: string | number | null | string[] | boolean,
    name: string,
    required: boolean,
    regex?: RegExp | null
  ) => {
    if (required && typeof value === 'string') {
      setHasError(invalidText(value));
    }
    if (required && Array.isArray(value) && value.length === 0) {
      setHasError(true);
    }

    if (typeof value === 'string' && regex) {
      const _regex = new RegExp(regex);
      setHasError(!_regex.test(value));
    }

    OnChange(value, name);
  };

  const OnChange = (
    value: string | number | null | string[] | boolean,
    key: string,
  ) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    const checkFormError = validateFormData(
      { [key]: value },
      { ...formError }
    );
    setFormError(checkFormError);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-16 bg-white rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-center mb-10">Login</h2>
        <div className="mb-8">
          <InputField
            name="email"
            value={formData?.email}
            label="Email"
            required={true}
            helperText="Email name is required"
            placeholder='Email'
            onChange={(value) => {
              handleChangeValue(
                value,
                'email',
                true
              );
            }}
            isError={formError.email}
            disabled={false}
            isLogin={true}
          />
        </div>
        <div className="mb-10">
          <InputField
            name="password"
            value={formData?.password}
            label="Password"
            required={true}
            helperText="Password name is required"
            placeholder='Password'
            onChange={(value) => {
              handleChangeValue(
                value,
                'password',
                true
              );
            }}
            isError={formError.password}
            disabled={false}
            isLogin={true}
            type='password'
          />
        </div>
        <div className="flex items-center justify-between mb-8">
          <label className="inline-flex items-center text-xl text-gray-600">
            <input type="checkbox" className="form-checkbox w-6 h-6" name="remember" />
            <span className="ml-4">Remember me</span>
          </label>
        </div>
        <Button
          onClick={handleSubmit}
          loading={loading}
          // htmlType="submit"
          className="w-full py-5 text-2xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Log in
        </Button>
      </div>
    </div>
  );


};

export default LoginComponent;
