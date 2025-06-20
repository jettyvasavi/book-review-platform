import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const UserProfilePage = () => {
  const { user, updateUser, loading, error: contextError } = useContext(UserContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');

    if (name.trim() === '' || email.trim() === '') {
      setFormError('Name and email cannot be empty.');
      return;
    }
    
    await updateUser({ name, email });
    if (!contextError) {
        setSuccess('Profile updated successfully!');
    }
  };

  if (!user) {
    return (
        <div className="page-container">
            <h1>User Profile</h1>
            <p>Please log in to view your profile.</p>
        </div>
    )
  }

  return (
    <div className="page-container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} className="form form-stacked">
        {formError && <ErrorMessage message={formError} />}
        {contextError && <ErrorMessage message={contextError} />}
        {success && <p className="success-message">{success}</p>}
        
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loader /> : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;

