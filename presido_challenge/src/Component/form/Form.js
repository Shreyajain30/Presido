import { useEffect, useState, useRef } from "react";
import React from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });
  const inputsRef = useRef([]);
  const [newUser, setNewUser] = useState(true);
  const [redirectToBuyer, setRedirectToBuyer] = useState(false);
  const [redirectToSeller, setRedirectToSeller] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const navigate = useNavigate();
  const resetForm = () => {
    setInputValue({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    });
    setSuccessMessage("");
  };
  function resetFormAndSetUser() {
    resetForm();
    setNewUser(!newUser);
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus();
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevInput = inputsRef.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inputValue.email,
      password: inputValue.password,
      role: inputValue.role,
    });
    if (newUser) {
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/auth/register", requestOptions)
        .then((response) => {
          const result = response.json();
          if (response.ok) {
            setTimeout(() => {
              resetFormAndSetUser();
            }, 2000);
          }
          return result;
        })
        .then((result) => {
          console.log(result.message);
          setSuccessMessage(result.message);
        })
        .catch((error) => console.error(error));
    } else {
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/auth/login", requestOptions)
        .then((response) => {
          return response.json().then((res) => {
            setSuccessMessage(res.message);
            if (!response.ok) {
              throw new Error("cant access details");
            }
            return res;
          });
        })
        .then((result) => {
          if (result.token) localStorage.setItem("jwtToken", result.token);
          if (inputValue.role === "buyer") setRedirectToBuyer(true);
          else if (inputValue.role === "seller") {
            setLoginEmail(inputValue.email);
            setRedirectToSeller(true);
          }
        })
        .catch((error) => console.error(error));
    }
  };
  useEffect(() => {
    if (redirectToBuyer) {
      navigate("/buyer");
      setRedirectToBuyer(false);
    }
    if (redirectToSeller) {
      navigate(`/seller/${loginEmail}`);
      setLoginEmail("");
      setRedirectToSeller(false);
    }
  }, [redirectToBuyer, redirectToSeller, navigate, loginEmail]);
  return (
    <div className="container">
      <div className="image">
        <h1>Find Your Perfect Retreat</h1> <p>Rent Your Dream Home Today!</p>
        <img src="/form-image.png" alt="form"></img>
      </div>
      <form id="form" onSubmit={handleSubmit}>
        <div className="title box">
          <h1 className="main">{newUser ? "SIGN UP" : "LOG IN"}</h1>
        </div>
        <hr />
        <div className="box-container">
          {newUser && (
            <div>
              <div className="firstName box">
                <label>First Name</label>
                <input
                  ref={(el) => (inputsRef.current[0] = el)}
                  className="line-input"
                  type="text"
                  placeholder="Enter First Name"
                  value={inputValue.firstName}
                  onKeyDown={(e) => handleKeyDown(e, 0)}
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
                  ref={(el) => (inputsRef.current[1] = el)}
                  className="line-input"
                  type="text"
                  placeholder="Enter Last Name"
                  value={inputValue.lastName}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
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
              ref={(el) => (inputsRef.current[2] = el)}
              className="line-input"
              type="tel"
              placeholder="+91"
              value={inputValue.phone}
              onKeyDown={(e) => handleKeyDown(e, 2)}
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
              ref={(el) => (inputsRef.current[3] = el)}
              className="line-input"
              type="email"
              id="email"
              placeholder="admin@gmail.com"
              value={inputValue.email}
              onKeyDown={(e) => handleKeyDown(e, 3)}
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
              ref={(el) => (inputsRef.current[4] = el)}
              className="line-input"
              type="password"
              id="password"
              placeholder="*******"
              value={inputValue.password}
              onKeyDown={(e) => handleKeyDown(e, 4)}
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
            <label>
              <input
                className="radio-button"
                type="radio"
                value="option1"
                checked={inputValue.role === "buyer"}
                onChange={(e) =>
                  setInputValue({ ...inputValue, role: "buyer" })
                }
              />
              Buyer
            </label>
            <label>
              <input
                className="radio-button"
                type="radio"
                value="option2"
                checked={inputValue.role === "seller"}
                onChange={(e) =>
                  setInputValue({ ...inputValue, role: "seller" })
                }
              />
              Seller
            </label>
          </div>
          {successMessage && (
            <div className="box">
              <p id="success">{successMessage}</p>
            </div>
          )}
          <div className="button-box box">
            <button className="button_container">
              <span className="button_content" id="submit">
                {newUser ? "SIGNUP" : "LOGIN"}
              </span>
            </button>
          </div>
          <div className="user box">
            {newUser ? (
              <p id="user">
                Already an user?
                <u onClick={resetFormAndSetUser}>Login</u>
              </p>
            ) : (
              <p id="user">
                A new user?
                <u onClick={resetFormAndSetUser}>SignUp</u>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
