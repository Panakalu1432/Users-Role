import UserDashboard from './components/UserDashboard';
import StoreOwnerDashboard from './components/StoreOwnerDashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/owner" element={<StoreOwnerDashboard />} />
      
    </Switch>
    </BrowserRouter>
  );
}

export default App;