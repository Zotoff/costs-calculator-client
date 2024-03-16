import React, { useEffect } from 'react';
import { Header } from './components/header/';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';
import { useStore, useUnit } from 'effector-react';
import { $auth, setAuth, setUsername } from './context/auth';
import { $alert } from './context/alert';
import { Alert } from './components/Alert/Alert';
import { CostsPage } from './components/CostsPage';
import { getAuthDataFromLs, removeUser } from './utils/auth';

function App() {

  const isLoggedIn = useUnit($auth);
  const alert = useUnit($alert);

  useEffect(()=>{
    const auth = getAuthDataFromLs();

    if (!auth || !auth.access_token || !auth.refresh_token) {
      removeUser();
    } else {
      setAuth(true);
      setUsername(auth.username);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      {alert.alertText && <Alert props={alert} />}
      <Router>
        <Routes>
            <Route path='/' element={isLoggedIn ? <Navigate to={`/costs`} /> : <Navigate to={'/login'} />} />
            <Route path='/registration' element={isLoggedIn ? <Navigate to={`/costs`} /> : <AuthPage type='registration' />} />
            <Route path='/login' element={isLoggedIn ? <Navigate to={`/costs`} /> : <AuthPage type='login' />} />
            <Route path='/costs' element={isLoggedIn ? <CostsPage /> : <Navigate to={`/login`} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
