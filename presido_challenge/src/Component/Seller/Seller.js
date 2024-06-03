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
  const[editId,setEditId]=useState(null);
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
  function handleDelete(id) {
    console.log(id);
    const updatedProperties = properties.filter((item) => item.id !== id);
    setProperties(updatedProperties);
  }
  function handleEdit(id) {
    const editProperty=properties.find((item)=>item.id===id);
    setIsEditing(true);
    setPropertyDetails(editProperty);
    setEditId(id);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({
      ...propertyDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEditing){
     const editProperties=properties.map((item)=>
    item.id===editId?propertyDetails:item
    )
     console.log(editProperties);
      setProperties(editProperties);
      setIsEditing(false);
      window.scrollTo({top:600,behavior:"smooth"});
    }
    else{
      const newProperty=propertyDetails;
      setProperties([...properties,newProperty]);
    }
    setPropertyDetails(
      {
        area: "",
        bedrooms: "",
        bathrooms: "",
        hospitalsNearby: "",
        collegesNearby: "",
        price: "",
        address: "",
      }
    )
  };

  return (
    <div className="seller-container">
      <section className="form-container">
        <div className="first-image">
          <img src="/form-house.png" alt="house"></img>
        </div>
        <form onSubmit={handleSubmit} className="property-form" method="POST">
          <h2 className="heading">Post a New Property</h2>
          <hr></hr>
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
          <button type="submit"  >
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
            properties.map((property) => (
              <div key={property.id} className="property-item-seller">
                <p>
                  <strong>Area:</strong> {property.area}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Hospitals Nearby:</strong> {property.hospitalsNearby}
                </p>
                <p>
                  <strong>Colleges Nearby:</strong> {property.collegesNearby}
                </p>
                <p>
                  <strong>Price:</strong> {property.price}
                </p>
                <p>
                  <strong>Address:</strong> {property.address}
                </p>
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
};

export default Seller;
