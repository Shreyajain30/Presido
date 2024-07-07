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

// import React, { useState, useRef } from "react";

// export default function Sorting({ properties, setProperties, toggleDropdown }) {
//   const [rent, setRent] = useState(false);
//   const [size, setSize] = useState(false);
//   const [inputField, setInputField] = useState(false);
//   const [input, setInput] = useState("");

//   const originalPropertiesRef = useRef([...properties]);

//   const toggleRentSorting = () => {
//     const updatedRent = !rent;
//     setRent(updatedRent);
//     if (updatedRent) {
//       const sortedProperties = [...properties].sort((a, b) => a.rent - b.rent);
//       setProperties(sortedProperties);
//     } else {
//       setProperties(originalPropertiesRef.current);
//     }
//   };

//   const toggleSizeSorting = () => {
//     const updatedSize = !size;
//     setSize(updatedSize);
//     if (updatedSize) {
//       const sortedProperties = [...properties].sort((a, b) => a.size - b.size);
//       setProperties(sortedProperties);
//     } else {
//       setProperties(originalPropertiesRef.current);
//     }
//   };

//   const filterLoc = () => {
//     setInputField(true);
//   };

//   const handleChange = (e) => {
//     const val = e.target.value;
//     setInput(val);
//     if (val === "") {
//       setProperties(originalPropertiesRef.current);
//     } else {
//       const sortedProperties = originalPropertiesRef.current.filter((item) =>
//         item.location.toLowerCase().includes(val.toLowerCase())
//       );
//       setProperties(sortedProperties);
//     }
//   };

//   return (
//     <div className="dropdown-menu">
//       <div onClick={toggleRentSorting}>
//         <p>Sort by Rent</p>
//       </div>
//       <div onClick={toggleSizeSorting}>
//         <p>Sort by Size</p>
//       </div>
//       <div onClick={filterLoc}>
//         <p>Search by Location</p>
//         {inputField && (
//           <section className="locSection">
//             <input
//               className="locInput"
//               type="text"
//               value={input}
//               onChange={handleChange}
//             ></input>
//             <button onClick={toggleDropdown}>🔍</button>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }
