import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const isUserRegistered = localStorage.getItem("isUserRegistered");

  useEffect(() => {
    axios.get('https://reactnd-books-api.udacity.com/books', { headers: { 'Authorization': 'whatever-you-want' } })
      .then(res => setBooks(res.data.books))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const notify = () => {
    toast.success("Registration Successful!", {
      position: toast.POSITION.TOP_LEFT
    });
  };

  return (
    <>
      <div className='header'>
        <div className='logo'>
          <img src="" alt="" />
          <h3>Book Store</h3>
          <div className='search-bar-div'>
            <input onInput={handleSearch} className='search-bar' type="text" placeholder="Search books..." />
            <img src="./assets/Search_logo.png" alt="" />
          </div>
        </div>

        <div className='register-btn-div'>
          {isUserRegistered ? (
            // If the user is registered, do not render the "Register" button
            <></>
          ) : (
            <Link to="/register">
              <button className='register-btn' onClick={notify}>Register</button>
            </Link>
          )}
          <img src="github" alt="" />
        </div>
      </div>

      <div className='books-library'>
        {filteredBooks.map(book => (
          <div key={book.id} className='book'>
            <a className="pointer" href={book.previewLink} target='blank'>
              <img src={book.imageLinks.thumbnail} alt="" />
            </a>
            <h4 className='book-title'>{book.title}</h4>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
