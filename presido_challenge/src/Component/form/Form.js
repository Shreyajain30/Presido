import { useState } from "react";
import React from "react";
import "./Form.css";
function Form({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState({ firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "", });
  const [user, setUser] = useState({ buyer: false, seller: false });

  const [logIn, setLogIn] = useState({
    title: false,
    user: false,
    button: "SIGNUP",
  });

  const handleSubmit = (event) => {};
  return (
    
      <div className="container">
          <div className="image">
         <h1>
            Find Your Perfect Retreat</h1> <p>Rent Your Dream Home Today!</p>
            <img src="/form-image.png" alt="form"></img>

          </div>
        <form id="form" onSubmit={handleSubmit}>
          
          <div className="title box">
            <h1 className="main">{logIn.title ? "LOG IN" : "SIGN UP"}</h1>
          </div>
          <hr />
          <div className="box-container">
            {!logIn.title && (
              <div>
                <div className="firstName box">
                  <label>First Name</label>
                  <input
                  className="line-input"
                    type="text"
                    placeholder="Enter First Name"
                    value={inputValue.firstName}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="lastName box">
                  <label>Last Name</label>
                  <input
                  className="line-input"
                    type="text"
                    placeholder="Enter Last Name"
                    value={inputValue.lastName}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            )}

            <div className="name box">
              <label>Phone Number</label>
              <input
              className="line-input"
                type="text"
                placeholder="Enter Phone No"
                value={inputValue.phone}
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
            
            <div className=" box">
              <label htmlFor="email">Email</label>
              <input
              className="line-input"
                type="text"
                id="email"
                placeholder="admin@gmail.com"
                value={inputValue.email}
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className=" box">
              <label htmlFor="password">Password</label>
              <input
              className="line-input"
                type="password"
                id="password"
                placeholder="*******"
                value={inputValue.password}
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className=" box">
              <label>Choose Any one</label>
              <label  >
                <input
                className="radio-button"
                  type="radio"
                  value="option1"
                  checked={user.buyer}
                  onChange={(e) => setUser({ buyer: true, seller: false })}
                  />
                  Buyer
              </label>
              <label >
                <input
                className="radio-button"
                  type="radio"
                  value="option2"
                  checked={user.seller}
                  onChange={(e) => setUser({ buyer: false, seller: true })}
                />
                Seller
              </label>
            </div>

            <div className="button-box box">
              <button className="button_container">
                <span className="button_content" id="submit">
                  {logIn.button}
                </span>
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
          </div>
        </form>
      </div>
    
  );
}

export default Form;
