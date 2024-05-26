// src/components/BuyerPage.js
import React, { useEffect, useState } from "react";

import "./BuyerPage.css";

const BuyerPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // const res = await api.get('/properties');
        setProperties([]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="buyer-page">
      <h1>Available Properties</h1>
      <div className="properties-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Location: {property.location}</p>
            <p>Rent: ${property.rent}</p>
            <p>Size: {property.size} sq ft</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;
