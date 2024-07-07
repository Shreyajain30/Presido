import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./BuyerPage.css";
import Sorting from "./Sorting";

export default function BuyerPage() {
  const [properties, setProperties] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contactMap, setContactMap] = useState({}); //key value pair as [id]:true
  const navigate = useNavigate();
  const originalPropertiesRef = useRef(properties);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("jwtToken");
    if (token) myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    fetch("http://localhost:4000/api/property/buyer", requestOptions)
      .then((response) => {
        if (!response.ok) {
          redirectToHome();
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setProperties(result);
          originalPropertiesRef.current = result;
        }
      })
      .catch((error) => console.error(error));
  }, []);

  function toggleDropdown() {
    if (dropdownOpen) {
      setProperties(originalPropertiesRef.current);
    }
    setDropdownOpen(!dropdownOpen);
  }
  function handleClick(id) {
    //id should not be passed as string here
    setContactMap((contactMap) => ({
      ...contactMap,
      [id]: !contactMap[id],
    }));
  }
  function redirectToHome() {
    navigate("/");
  }
  return (
    <div className="buyer-page">
      <h2 className="main-heading">Available Properties</h2>
      <hr></hr>
      <div className="dropdown">
        <button className="filter-button" onClick={toggleDropdown}>
          ⮃ Filter
        </button>
        {dropdownOpen && (
          <Sorting
            properties={properties}
            setProperties={setProperties}
            toggleDropdown={toggleDropdown}
          />
        )}
      </div>
      <div className="properties-list">
        {properties &&
          properties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-images">
                {property.images &&
                  property.images.map(
                    (image, index) =>
                      image.length !== 0 && (
                        <img key={index} src={image} alt={"Property"} />
                      )
                  )}
              </div>
              <div className="property-card-header">
                <h3>{property.title}</h3>
                <p className="property-rent">
                  Rs.{Number(property.rent).toLocaleString()}
                </p>
              </div>
              {!contactMap[property.id] ? (
                <div className="property-details">
                  <p>{property.description}</p>
                  <p>
                    <strong>Location:</strong> {property.location}
                  </p>
                  <p>
                    <strong>Size:</strong>{" "}
                    {Number(property.size).toLocaleString()} sq ft
                  </p>
                </div>
              ) : (
                <div className="property-details">
                  <p>
                    <strong>Seller:</strong> {property.seller}
                  </p>
                  <p>
                    <strong>Contact:</strong> {property.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {property.email}
                  </p>
                </div>
              )}
              <button
                className="rent-button"
                onClick={() => handleClick(property.id)}
              >
                {!contactMap[property.id] ? "Contact" : "Details"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
