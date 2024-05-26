
import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Form.css';
function Form({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });
  const [logIn, setLogIn] = useState({
    title: false,
    user: false,
    button: "SIGNUP",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const a = /[a-z]/.test(inputValue.email);
    const b = /[A-Z]/.test(inputValue.password);
    const c = /[!@#$%^&*()_+-=[]{};’:”\|,.<>\/?]+/.test(inputValue.password);

    const e = inputValue.email.indexOf("@");
    const f = inputValue.email.indexOf(".");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    console.log(inputValue);
    // console.log(e,f,passwordError,passwordInput);
    if (inputValue.email === null || e === -1 || f === -1) {
      setError({ email: true, password: error.password });
      emailInput.style.border = "1px solid red";
      setTimeout(() => {
        setError({ email: false, password: error.password });
        emailInput.style.border = "1px solid grey";
      }, 3000);
    } else if (!a || !b || c === -1 || inputValue.password.length < 8) {
      setError({ email: error.email, password: true });
      passwordInput.style.border = "1px solid red";
      setTimeout(() => {
        setError({ email: error.email, password: false });
        passwordInput.style.border = "1px solid grey";
      }, 3000);
    } else {
      console.log(inputValue.email);
      let myHeaders, raw, requestOptions;
      if (logIn.button === "SIGNUP") {
        myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer {{authToken}}");

        raw = JSON.stringify({
          email: inputValue.email,
          password: inputValue.password
        });

        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://xerver.onrender.com/api/users/sign-up", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      } else {
        myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer {{authToken}}");

        raw = JSON.stringify({
          email: inputValue.email,
          password: inputValue.password
        });

        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://xerver.onrender.com/api/users/login", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }

      setLogIn({ title: logIn.title, user: logIn.user, button: "loading..." });
      setTimeout(() => {
        setLogIn({
          title: logIn.title,
          user: logIn.user,
          button: logIn.title ? "LOGIN" : "SIGNUP",
        });
        setInputValue({ email: "", password: "" });
      }, 2000);

      // alert("Accepted!");
    }
  };
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
          <div className="email box">
            <label htmlFor="email">
              First Name
            </label>
            <input
              type="text"
              id="email"
              placeholder="admin@gmail.com"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({
                  email: e.target.value,
                  password: inputValue.password,
                })
              }
              required
            />
            {error.email ? (
              <p id="invalid_email">Please enter valid email Id!</p>
            ) : null}
          </div>
          <div className="email box">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="admin@gmail.com"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({
                  email: e.target.value,
                  password: inputValue.password,
                })
              }
              required
            />
            {error.email ? (
              <p id="invalid_email">Please enter valid email Id!</p>
            ) : null}
          </div>

          <div className="password box">
            <label htmlFor="password">
              Phone Number
            </label>
            <input
              type="password"
              id="password"
              placeholder="*******"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({
                  email: inputValue.email,
                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="box forget">
            <div>
              {error.password ? (
                <p id="invalid_password">
                  Must be 8 or more characters and contain at least one
                  uppercase, one lowercase and special character!
                </p>
              ) : null}
            </div>
            <div className="forgetId">
              <a href="#" id="forget">
                Forget Password?
              </a>
            </div>
          </div>

          <div className="box">
            <button className="button_container">
              <p className="button_content" id="submit">
                {logIn.button}
              </p>
              <i id="button_icon" className="fa-solid fa-user-plus"></i>
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