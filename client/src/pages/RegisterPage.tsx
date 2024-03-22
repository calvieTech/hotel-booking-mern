import React, { FormEvent, useEffect, useState } from 'react';
// import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { RootState } from '../store';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

function RegisterPage() {
  const [register] = useRegisterMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userCredentials } = useSelector((state: RootState) => state?.auth);

  const registerHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          password,
        }).unwrap();

        console.log(`res register: `, res);

        dispatch(setCredentials({ ...res }));
        toast.success('Successfully registered an account!');
        navigate('/');
      } catch (error) {
        toast.error('Register attempt failed!');
      }
    }
  };

  useEffect(() => {
    if (userCredentials) {
      navigate('/');
    }
  }, [navigate, userCredentials]);

  return (
    <form className='flex flex-col gap-5' onSubmit={registerHandler}>
      <h2 className='text-3xl font-bold'>Create an account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label
          htmlFor='firstName'
          className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            name='firstName'
            id='firstName'
            type='text'
            className='border rounded w-full py-1 px-2 font-normal'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* {error.firstName && (
            <span className='text-red-500'>{error.firstName.message}</span>
          )} */}
        </label>
        <label
          htmlFor='lastName'
          className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            name='lastName'
            id='lastName'
            type='text'
            className='border rounded w-full py-1 px-2 font-normal'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* {errors.lastName && (
            <span className='text-red-500'>{errors.lastName.message}</span>
          )} */}
        </label>
      </div>
      <label htmlFor='email' className='text-gray-700 text-sm font-bold flex-1'>
        Email Address
        <input
          name='email'
          id='email'
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )} */}
      </label>
      <label
        htmlFor='password'
        className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          name='password'
          id='password'
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )} */}
      </label>
      <label
        htmlFor='confirmPassword'
        className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          name='confirmPassword'
          id='confirmPassword'
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )} */}
      </label>
      <span>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Register Now!
        </button>
      </span>
    </form>
  );
}

export default RegisterPage;
