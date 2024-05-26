import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";
function Form({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [user, setUser] = useState({ buyer: false, seller: false });

  const [logIn, setLogIn] = useState({
    title: false,
    user: false,
    button: "SIGNUP",
  });

  const handleSubmit = (event) => {};
  return (
    <div className="container">
      <div className="form">
        <form id="form" onSubmit={handleSubmit}>
          <div className="header box"></div>
          <hr />
          <div className="title box">
            <h1 className="main">{logIn.title ? "LOG IN" : "SIGN UP"}</h1>
          </div>
          <hr />
          <div className="firstName box">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              value={inputValue.firstName}
              onChange={(e) =>
                setInputValue({
                  firstName: e.target.value,
                  lastName: inputValue.lastName,
                  phone: inputValue.phone,
                  email: inputValue.email,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          <div className="name box">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={inputValue.lastName}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: e.target.value,
                  phone: inputValue.phone,
                  email: inputValue.email,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          <div className="name box">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={inputValue.phone}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: e.target.value,
                  email: inputValue.email,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          
          <div className=" box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="admin@gmail.com"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: inputValue.phone,
                  email: e.target.value,
                  password: inputValue.password,
                })
              }
              required
            />
          </div>
          <div className=" box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({
                  firstName: inputValue.firstName,
                  lastName: inputValue.lastName,
                  phone: inputValue.phone,
                  email: inputValue.email,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className=" box">
            <label>Choose Any one</label>
            <label>
              <input
                type="radio"
                value="option1"
                checked={user.buyer}
                onChange={(e) => setUser({ buyer: true, seller: false })}
              />
              Buyer
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={user.seller}
                onChange={(e) => setUser({ buyer: false, seller: true })}
              />
              Seller
            </label>
          </div>

          <div className="box">
            <button className="button_container">
              <p className="button_content" id="submit">
                {logIn.button} 
              </p>
              
            </button>
          </div>
          <div className="user box">
            {logIn.user ? (
              <p id="user">
                A new user?
                <u
                  onClick={(e) =>
                    setLogIn({ title: false, user: false, button: "SIGNUP" })
                  }
                >
                  SignUp
                </u>
              </p>
            ) : (
              <p id="user">
                Already an user?
                <u
                  onClick={(e) =>
                    setLogIn({ title: true, user: true, button: "LOGIN" })
                  }
                >
                  Login
                </u>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
