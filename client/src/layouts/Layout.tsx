import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen sm:flex-1'>
      <Header />
      <ToastContainer />
      <Hero />
      <div className='container mx-auto py-10 flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
