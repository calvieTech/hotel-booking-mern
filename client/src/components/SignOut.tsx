import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../slices/usersApiSlice';

function SignOut() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    await logout().unwrap();
    console.log(`signout`);
  };

  return (
    <button
      onClick={signOutHandler}
      className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100'>
      SignOut
    </button>
  );
}

export default SignOut;
