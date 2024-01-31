import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Forms = () => {
  const [data, setData] = useState({
    firstName: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const [error, setError] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);

  const handleInput = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setError(errors);

    if (Object.keys(errors).length === 0) {
      setFormSubmit(true);
      notify();
    } else {
      setFormSubmit(false);
    }
  };

  const validate = (data) => {
    let errors = {};

    if (data.firstName.trim() === "") {
      errors.firstName = "Please enter the First name";
    }

    if (data.email.trim() === "") {
      errors.email = "Please enter the Email";
    }

    if (data.password.trim() === "") {
      errors.password = "Please enter the Password";
    } else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}/.test(data.password)) {
      errors.password = "Password must at least 10 characters with one special character";
    }

    if (data.passwordAgain.trim() === "") {
      errors.passwordAgain = "Please enter the Password again";
    } else if (data.passwordAgain !== data.password) {
      errors.passwordAgain = "Password does not match! Please try again";
    }

    return errors;
  };

  const notify = () => toast("Registration Successful :)");

  return (
    <>
      <div className="parent">
        <form onSubmit={handleSubmit} className="form">
          <h3 className="create">
            <u>Create an Account</u>
          </h3>

          <div className="inputContainer">
            <label htmlFor="firstName" className="label">
              Enter your name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInput}
              className="input"
            />
            {error.firstName ? <p className="error">{error.firstName}</p> : ""}
          </div>

          <div className="inputContainer">
            <label htmlFor="email" className="label">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
              className="input"
            />
            {error.email ? <p className="error">{error.email}</p> : ""}
          </div>

          <div className="inputContainer">
            <label htmlFor="password" className="label">
              Enter Your password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              onChange={handleInput}
              className="input"
            />
            {error.password ? <p className="error">{error.password}</p> : ""}
          </div>

          <div className="inputContainer">
            <label htmlFor="password" className="label">
              Enter Your password again
            </label>
            <input
              type="password"
              name="passwordAgain"
              placeholder="Enter Your password again"
              onChange={handleInput}
              className="input"
            />
            {error.passwordAgain ? (
              <p className="error">{error.passwordAgain}</p>
            ) : (
              ""
            )}
          </div>

          <input
            type="submit"
            value={"Sign Up"}
            className="submitButton"
          />
          {formSubmit && <ToastContainer />}
        </form>
      </div>
    </>
  );
};

export default Forms;
