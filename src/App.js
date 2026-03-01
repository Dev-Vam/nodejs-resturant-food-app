import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/home" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/register">
          {isAuthenticated ? <Redirect to="/home" /> : <Register onLogin={handleLogin} />}
        </Route>
        <Route path="/home">
          {isAuthenticated ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/menu">
          {isAuthenticated ? <Menu /> : <Redirect to="/login" />}
        </Route>
        <Route path="/cart">
          {isAuthenticated ? <Cart /> : <Redirect to="/login" />}
        </Route>
        <Route path="/profile">
          {isAuthenticated ? <Profile user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/orders">
          {isAuthenticated ? <Orders /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;