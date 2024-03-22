import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../slices/authSlice.ts';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { RootState } from '../store.ts';

const Header = () => {
  const { userCredentials } = useSelector((state: RootState) => state?.auth);
  const [logoutAPICall] = useLogoutMutation();

  const dispatch = useDispatch();

  const signOutHandler = async () => {
    try {
      const res = await logoutAPICall(userCredentials).unwrap();
      dispatch(logout({ ...res }));
      toast.success('Successfully logged out!');
    } catch (err: any) {
      console.error(err.message);
      toast.error('Could not logout!');
    }
  };

  return (
    <section className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='xs:text-2xl text-3xl text-white font-bold tracking-tight'>
          <Link to={'/'}>BookIt.com</Link>
        </span>
        <span className='flex space-x-2 justify-center'>
          {userCredentials ? (
            <>
              <Link
                to={'/my-bookings'}
                className='bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-blue-600'>
                My Bookings
              </Link>
              <Link
                to={'/my-hotels'}
                className='bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-red-600'>
                My Hotels
              </Link>
              <button
                onClick={signOutHandler}
                className='bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-red-600'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={'/register'}
                className='bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-red-600'>
                Register an account
              </Link>
              <Link
                to={'/login'}
                className='bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-red-600'>
                Sign in to an account
              </Link>
            </>
          )}
        </span>
      </div>
    </section>
  );
};

export default Header;
