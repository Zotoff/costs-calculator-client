import React from 'react';
import { Header } from './components/header/';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';
import { useStore, useUnit } from 'effector-react';
import { $auth } from './context/auth';

function App() {

  const isLoggedIn = useUnit($auth);

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
            <Route path='/' element={isLoggedIn ? <Navigate to={`/costs`} /> : <Navigate to={'/login'} />} />
            <Route path='/registration' element={isLoggedIn ? <Navigate to={`/costs`} /> : <AuthPage type='registration' />} />
            <Route path='/login' element={isLoggedIn ? <Navigate to={`/costs`} /> : <AuthPage type='login' />} />
            <Route path='/costs' element={isLoggedIn ? <h1>Costs</h1> : <Navigate to={`/login`} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
