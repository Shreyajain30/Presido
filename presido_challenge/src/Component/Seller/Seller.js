import React, { useState, useEffect, useRef } from "react";
import "./Seller.css";
import { useParams, useNavigate } from "react-router-dom";
export default function Seller() {
  const { email } = useParams();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    location: "",
    rent: "",
    size: "",
    images: ["", "", ""],
    seller: "",
    contact: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const formReset = () => {
    setFormInput({
      title: "",
      description: "",
      location: "",
      rent: "",
      size: "",
      images: ["", "", ""],
      seller: "",
      contact: "",
      email: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("images[")) {
      const index = parseInt(name.match(/images\[(\d+)\]/)[1], 10);
      const imagesCopy = [...formInput.images];
      imagesCopy[index] = value;
      setFormInput({
        ...formInput,
        images: imagesCopy,
      });
    } else
      setFormInput({
        ...formInput,
        [name]: value,
      });
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevInput = inputsRef.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  };
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
    fetch(`http://localhost:4000/api/property/seller/${email}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          redirectToHome();
          throw new Error("Failed to fetch properties");
        }
        return response.json();
      })
      .then((result) => {
        // Ensure result is an array
        if (Array.isArray(result)) {
          setProperties(result);
        } else {
          console.error("API did not return an array");
        }
      })
      .catch((error) => console.error(error));
  }, [email]);

  //handle form inputs when edit a property
  function handleEdit(id) {
    const editProperty = properties.find((property) => property.id === id);
    setFormInput(editProperty);
    setIsEditing(true);
    setEditId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  //post new property
  const handlePostProperty = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("jwtToken");
    if (token) myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      ...formInput,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:4000/api/property/seller/${email}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to post new property")
        }
        else
        formReset();
        return response.json();
      })
      .then((result) => {
        const newProperties = [...properties, result.property];
        setProperties(newProperties);
      })

      .catch((error) => console.error(error));
  };
  //update existing property
  const handleUpdateProperty = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("jwtToken");
    if (token) myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      ...formInput,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:4000/api/property/${editId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to update property");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.id === editId ? result.property : property
          )
        );
      })
      .catch((error) => console.error(error));
    formReset();
    setEditId(null);
    setIsEditing(false);
  };
  //delete existing property
  function handleDelete(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("jwtToken");
    if (token) myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };
    fetch(`http://localhost:4000/api/property/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("failed to delete property");
        else {
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== id)
          );
        }
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  function redirectToHome() {
    navigate("/");
  }
  return (
    <div className="seller-container">
      <section className="form-container">
        <div className="first-image">
          <img src="/form-house.png" alt="house"></img>
        </div>
        <form
          onSubmit={isEditing ? handleUpdateProperty : handlePostProperty}
          className="property-form"
        >
          {isEditing ? (
            <h2 className="heading">Update the existing Property</h2>
          ) : (
            <h2 className="heading">Post a New Property</h2>
          )}
          <hr></hr>
          <input
            ref={(el) => (inputsRef.current[0] = el)}
            type="text"
            name="title"
            placeholder="Title with Specific BHKs"
            value={formInput.title}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[1] = el)}
            type="text"
            name="description"
            placeholder="Description of Property"
            value={formInput.description}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[2] = el)}
            type="text"
            name="location"
            placeholder="Location"
            value={formInput.location}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[3] = el)}
            type="number"
            name="rent"
            min={1}
            placeholder="Rent"
            value={formInput.rent}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[4] = el)}
            type="number"
            name="size"
            min={1}
            placeholder="Size in sq ft"
            value={formInput.size}
            onKeyDown={(e) => handleKeyDown(e, 4)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[5] = el)}
            type="text"
            name="seller"
            placeholder="Seller Name"
            value={formInput.seller}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[6] = el)}
            type="tel"
            name="contact"
            placeholder="Contact No."
            value={formInput.contact}
            onKeyDown={(e) => handleKeyDown(e, 6)}
            onChange={handleInputChange}
            required
          />
          <input
            ref={(el) => (inputsRef.current[7] = el)}
            type="email"
            name="email"
            placeholder="Contact Email"
            value={formInput.email}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 7)}
            required
          />
          <label>Upload Images:</label>
          {formInput.images.map((image, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[7 + index + 1] = el)}
              type="text"
              name={`images[${index}]`}
              placeholder={`Image ${index + 1} URL`}
              value={image}
              onKeyDown={(e) => handleKeyDown(e, 7 + index + 1)}
              onChange={handleInputChange}
              required={index === 0}
            />
          ))}
          <button type="submit">
            {isEditing ? "Update Property" : "Post Property"}
          </button>
        </form>
        <div className="last-image">
          <img src="/form-house.png" alt="house"></img>
        </div>
      </section>
      <section className="properties-container-seller">
        <h2 className="heading">Posted Properties</h2>
        <hr></hr>
        <div className="properties-list-seller">
          {properties.length === 0 ? (
            <p className="no-property">No properties added yet.</p>
          ) : (
            properties &&
            properties.map((property) => (
              <div key={property.id} className="property-item-seller">
                <div className="property-images">
                  {/* {property.images.length === 0 ? (
                    <p className="no-images">🔍 No Images Added.</p>
                  ) : ( property.images.length!==0 && 
                    property.images &&
                    property.images.map(
                      (image, index) =>
                        image.length !== 0 && (
                          <img key={index} src={image} alt={"Property"} />
                        )
                    )
                  )} */}
                  {property.images &&
                    property.images.map(
                      (image, index) =>
                        image.length !== 0 && (
                          <img key={index} src={image} alt={"Property"} />
                        )
                    )}
                </div>
                <div className="detail-container">
                  <p>
                    <strong>Title:</strong> {property.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {property.description}
                  </p>
                  <p>
                    <strong>Location:</strong> {property.location}
                  </p>
                  <p>
                    <strong>Rent:</strong> Rs.{" "}
                    {Number(property.rent).toLocaleString()}
                  </p>
                  <p>
                    <strong>Size:</strong>{" "}
                    {Number(property.size).toLocaleString()} sq feet
                  </p>
                  <p>
                    <strong>Seller Name:</strong> {property.seller}
                  </p>
                  <p>
                    <strong>Contact No. :</strong> {property.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {property.email}
                  </p>
                </div>
                <div className="button-container">
                  <button onClick={() => handleEdit(property.id)}>Edit</button>
                  <button onClick={() => handleDelete(property.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
