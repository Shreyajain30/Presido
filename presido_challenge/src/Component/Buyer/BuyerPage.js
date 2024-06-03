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
            size: 2000,
            images: [
              "https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-house-design-go-for-minimalist.png",
              "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
            ]
          },
          {
            _id: 2,
            title: "Luxury Villa with Pool",
            description: "A luxurious villa with a private pool and garden.",
            location: "Bangalore, Karnataka",
            rent: 150000,
            size: 3000,
            images: [
              "https://houzone.com/wp-content/uploads/2021/01/3-bedroom-luxury-pool-house-design-house-plans-indiahousedesign-houzone-01.jpg",
              "https://5.imimg.com/data5/SELLER/Default/2022/6/TO/ZO/FY/29206063/luxurious-bedroom-interior-design-500x500.jpg"
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
             "https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-and-beautiful-house-design-the-loft-aesthetic.png",
              "https://cms.interiorcompany.com/wp-content/uploads/2024/03/marry-neutrals-with-pastels-cozy-bedroom-decor.jpg"]
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
      <h2>Available Properties</h2>
      <hr></hr>
      <div className="properties-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <div className="property-images">
              {property.images.map((image, index) => (
                <img key={index} src={image} alt={"Property" }  />
              ))}
            </div>
            <div className="property-card-header">
              <h3>{property.title}</h3>
              <p className="property-rent">Rs.{property.rent.toLocaleString()}</p>
            </div>
            <div className="property-details">
              <p>{property.description}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Size:</strong> {property.size} sq ft</p>
            </div>
            <button>Rent</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;
