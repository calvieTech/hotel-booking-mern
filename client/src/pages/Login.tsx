import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';

const Login = () => {
  const [login] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userCredentials } = useSelector((state) => state?.auth);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Logged in successfully!');
      navigate('/', { replace: true });
    } catch (err: unknown) {
      toast.error('Login attempt has failed!');
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    if (userCredentials) {
      navigate('/');
    }
  }, [navigate, userCredentials]);

  return (
    <form className='flex flex-col gap-5' onSubmit={submitHandler}>
      <h2 className='text-3xl font-bold'>Sign In</h2>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          value={[password]}
          onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?{' '}
          <Link className='underline' to='/register'>
            Create an account here
          </Link>
        </span>
        <span>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Login
          </button>
        </span>
      </span>
    </form>
  );
};

export default Login;
