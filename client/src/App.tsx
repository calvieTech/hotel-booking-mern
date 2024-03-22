import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { RootState } from './store';

function App() {
  const authState = useSelector((state: RootState) => state?.auth);

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
