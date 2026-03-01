import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const history = useHistory();

  const handleLogout = () => {
    onLogout();
    history.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          🍽️ Restaurant Food App
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/home" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="navbar-link">Menu</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link">Cart</Link>
          </li>
          <li>
            <Link to="/orders" className="navbar-link">My Orders</Link>
          </li>
          <li>
            <Link to="/profile" className="navbar-link">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;