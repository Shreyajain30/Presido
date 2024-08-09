import React, { useState, useRef } from "react";
export default function Sorting({ properties, setProperties, toggleDropdown }) {
  const [sortedByRent, setSortedByRent] = useState(false);
  const [sortedBySize, setSortedBySize] = useState(false);
  const [displayInputField, setDisplayInputField] = useState(false);
  const [input, setInput] = useState("");
  const originalPropertiesRef = useRef(properties);

  const handleRentSorting = () => {
    const updated = !sortedByRent;
    setSortedByRent(updated);
    if (updated) {
      const sortedProperties = [...properties].sort((a, b) => {
        return a.rent - b.rent;
      });
      setProperties(sortedProperties);
    } else {
      setProperties(originalPropertiesRef.current);
    }
  };

  const handleSizeSorting = () => {
    const updated = !sortedBySize;
    setSortedBySize(updated);
    if (updated) {
      const sortedProperties = [...properties].sort((a, b) => {
        return a.size - b.size;
      });
      setProperties(sortedProperties);
    } else {
      setProperties(originalPropertiesRef.current);
    }
  };

  const displayInput = () => {
    setDisplayInputField(true);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val === "") {
      setProperties(originalPropertiesRef.current);
    } else {
      const sortedProperties = originalPropertiesRef.current.filter((item) =>
        item.location.toLowerCase().includes(val.toLowerCase().trim())
      );
      setProperties(sortedProperties);
    }
  };

  return (
    <div className="dropdown-menu">
      <div onClick={handleRentSorting}>
        <p>{sortedByRent ? "✔️" : ""}Sort by Rent</p>
      </div>
      <div onClick={handleSizeSorting}>
        <p>{sortedBySize ? "✔️" : ""}Sort by Size</p>
      </div>
      <div onClick={displayInput}>
        <p>Search by Location</p>
        {displayInputField && (
          <p className="locSection">
            {/* <button >🔍</button> */}
            <input
              className="locInput"
              type="text"
              value={input}
              onChange={handleChange}
            ></input>
          </p>
        )}
      </div>
    </div>
  );
}
