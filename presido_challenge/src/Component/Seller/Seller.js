import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Seller.css";

const Seller = () => {
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    hospitalsNearby: "",
    collegesNearby: "",
    price: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulate fetching data with hardcoded properties
        const sampleProperties = [
          {
            id: 1,
            area: "Spacious 3 BHK Apartment",
            bedrooms: 3,
            bathrooms: 2,
            hospitalsNearby: "Hospital A, Hospital B",
            collegesNearby: "College X, College Y",
            price: 75000,
            address: "123, ABC Street, City",
          },
          {
            id: 2,
            area: "Luxury Villa with Pool",
            bedrooms: 5,
            bathrooms: 4,
            hospitalsNearby: "Hospital C, Hospital D",
            collegesNearby: "College Z, College W",
            price: 150000,
            address: "456, XYZ Street, City",
          },
          {
            id: 3,
            area: "Cozy 2 BHK Apartment",
            bedrooms: 2,
            bathrooms: 1,
            hospitalsNearby: "Hospital E, Hospital F",
            collegesNearby: "College M, College N",
            price: 50000,
            address: "789, PQR Street, City",
          },
        ];

        setProperties(sampleProperties);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Handle edit submission
    } else {
      // Handle create submission
    }
    setPropertyDetails({
      area: "",
      bedrooms: "",
      bathrooms: "",
      hospitalsNearby: "",
      collegesNearby: "",
      price: "",
      address: "",
    });
  };

  const handleDelete = (id) => {
    // Handle delete logic
  };

  const handleEdit = (id) => {
    // Handle edit logic
  };

  return (
    <div className="seller-container">
      <h1 className="heading">Post a New Property</h1>
      <form onSubmit={handleSubmit} className="property-form">
      <input
          type="text"
          name="area"
          placeholder="Area"
          value={propertyDetails.area}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="bedrooms"
          placeholder="Number of Bedrooms"
          value={propertyDetails.bedrooms}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="bathrooms"
          placeholder="Number of Bathrooms"
          value={propertyDetails.bathrooms}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="hospitalsNearby"
          placeholder="Hospitals Nearby"
          value={propertyDetails.hospitalsNearby}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="collegesNearby"
          placeholder="Colleges Nearby"
          value={propertyDetails.collegesNearby}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={propertyDetails.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={propertyDetails.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update Property" : "Post Property"}</button>
      </form>

      <h2 className="heading">Posted Properties</h2>
      <div className="properties-list">
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="property-item">
              <p><strong>Area:</strong> {property.area}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Hospitals Nearby:</strong> {property.hospitalsNearby}</p>
              <p><strong>Colleges Nearby:</strong> {property.collegesNearby}</p>
              <p><strong>Price:</strong> {property.price}</p>
              <p><strong>Address:</strong> {property.address}</p>
              <button onClick={() => handleEdit(property.id)}>Edit</button>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Seller;
