
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">BookReview</Link>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Books</NavLink>
        
        {user ? (
          <>
            <NavLink to="/add-book" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Add Book</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {user.name}'s Profile
            </NavLink>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
