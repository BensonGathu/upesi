import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../slices/authSlice';
import { login } from '../Services/authService';
import googleLogo from '../../assets/google.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { username, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);

      dispatch(loginSuccess(response.token));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const responseGoogle = (response) => {
    if (response.credential) {
      dispatch(loginSuccess(response.credential));
      navigate('/');
    } else {
      console.log('Google Sign-In failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-calc bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className="mb-3 text-4xl font-bold">Welcome back!</span>
            <span className="font-normal text-green-500 mb-2">Login and start shopping</span>
            <div className="py-4">
              <span className="mb-2 text-md">Username</span>
              <input
                type="text"
                id="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="py-2">
              <span className='mb-2 text-md'>Password</span>
              <input
                type="password"
                id="password"
                placeholder='Enter your password'
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className='flex justify-end w-full py-4'>
              <span className="font-bold text-md">Forgot your password?</span>
            </div>


            {loading && (
              <div className="flex justify-center mb-6">

                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>

              </div>
            )}


            {!loading ? (
              <button
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                type="submit"
              >
                Sign in
              </button>
            ) : null}

            <button className="mb-6">
              <GoogleLogin
                clientId="600187593848-6ci83f9a0fr37o3bkjponf636v2tslri.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                width="300px"
              />
            </button>

            <div className='text-center text-gray-400'>
              Don't have an account?
              <span className='font-bold text-black pl-1'>Sign up for free</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
