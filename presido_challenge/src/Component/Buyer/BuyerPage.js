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
        // Simulate fetching data with hardcoded properties
        const sampleProperties = [
          {
            _id: 1,
            title: "Spacious 3 BHK Apartment",
            description: "A beautiful and spacious 3 BHK apartment with all modern amenities.",
            location: "Mumbai, Maharashtra",
            rent: 75000,
            size: 1500,
            images: [
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
              "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
            ]
          },
          {
            _id: 2,
            title: "Luxury Villa with Pool",
            description: "A luxurious villa with a private pool and garden.",
            location: "Bangalore, Karnataka",
            rent: 150000,
            size: 3000,
            images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
            ]
          },
          {
            _id: 3,
            title: "Cozy 2 BHK Apartment",
            description: "A cozy 2 BHK apartment located in the heart of the city.",
            location: "Delhi, Delhi",
            rent: 50000,
            size: 1000,
            images: [
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
              "https://images.unsplash.com/photo-1570129477492-45c003edd2be"]
          }
        ];

        setProperties(sampleProperties);
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
            <div className="property-card-header">
              <h2>{property.title}</h2>
              <p className="property-rent">${property.rent.toLocaleString()}</p>
            </div>
            <div className="property-images">
              {property.images.map((image, index) => (
                <img key={index} src={image} alt={`Property ${property._id} Image ${index + 1}`} />
              ))}
            </div>
            <div className="property-details">
              <p>{property.description}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Size:</strong> {property.size} sq ft</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;
