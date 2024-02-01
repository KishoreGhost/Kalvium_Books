import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import logo from "../assets/logo.png"  

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  
  // Fetching API
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((res) => setBooks(res.data.books))
      .catch((err) => console.log(err));
  }, []);

  // Function to give the Searched book by the user 
  const handleSearch = (e) => {
    e.preventDefault();
    const userInput = e.target.value;
    setSearch(userInput);
  };

  //Function to filter all the books from the api 
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

//Render the Home Page
  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="lo" src={logo} alt="" />
          <div className="search-bar-div">
            <input
              onChange={handleSearch}
              className="search-bar"
              type="text"
              placeholder="Search books..."
            />
          </div>
        </div>

        <div className="register-btn-div">
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
          <img src="github" alt="" />
        </div>
      </div>

      <div className="books-library">
        {filteredBooks.length === 0 ? (
          <h2>No books found :( </h2>
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} className="book">
              <a className="pointer" href={book.previewLink} target="blank">
                <img
                  className="book-img"
                  src={book.imageLinks.thumbnail}
                  alt=""
                />
              </a>
              <h4 className="book-title">{book.title}</h4>
              <p>⭐ Free</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
