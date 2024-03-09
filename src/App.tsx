import React from 'react';
import { Header } from './components/header/';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthPage } from './components/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
            <Route path='/' element={<AuthPage type='login' />} />
            <Route path='/registration' element={<AuthPage type='registration' />} />
            <Route path='/login' element={<AuthPage type='login' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
