
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import { BookProvider } from './context/BookContext';
import { UserProvider } from './context/UserContext';
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Book.css';
import './styles/Forms.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    // UserProvider and BookProvider MUST wrap everything inside BrowserRouter
    <UserProvider>
      <BookProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/add-book" element={<AddBookPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </BrowserRouter>
      </BookProvider>
    </UserProvider>
  );
}

export default App;



