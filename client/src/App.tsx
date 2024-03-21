import { useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SignOut from './components/SignOut';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <RegisterPage />
            </Layout>
          }
        />
        <Route
          path='/login'
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route path='*' element={<span>Home page</span>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
