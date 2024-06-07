import React, { useState } from "react";

export default function Sorting({ properties, setProperties, toggleDropdown }) {
  const rentSorting = () => {
    const sortedProperties = JSON.parse(JSON.stringify(properties));
    sortedProperties.sort((a, b) => a.rent - b.rent);
    setProperties(sortedProperties);
  };
  const sizeSorting = () => {
    const sortedProperties = JSON.parse(JSON.stringify(properties));
    sortedProperties.sort((a, b) => a.size - b.size);
    setProperties(sortedProperties);
  };
  const [inputField, setInputField] = useState(false);
  const [input, setInput] = useState("");
  const filterLoc = () => {
    setInputField(true);
    console.log(inputField);
  };
  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    const sortedProperties = properties.filter((item) =>
      item.location.toLowerCase().includes(val.toLowerCase())
    );
    setProperties(sortedProperties);
  };
  return (
    <div className="dropdown-menu">
      <div onClick={rentSorting}><p>Sort by Rent</p></div>
      <div onClick={sizeSorting}><p>Sort by Size</p></div>
      <div onClick={filterLoc}>
       <p>Sort by Location</p> 
        {inputField && (
          <section class="locSection">
            <input
              className="locInput"
              type="text"
              value={input}
              onChange={handleChange}
            ></input>
            <button onClick={toggleDropdown}>🔍</button>
          </section>
        )}
      </div>
    </div>
  );
}
