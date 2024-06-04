import React from "react";

export default function Sorting({properties,setProperties}){
    const rentSorting=()=>{
        const sortedProperties=JSON.parse(JSON.stringify(properties));
        sortedProperties.sort((a,b)=>a.rent-b.rent);
        setProperties(sortedProperties);
    }
    const sizeSorting=()=>{
        const sortedProperties=JSON.parse(JSON.stringify(properties));
        sortedProperties.sort((a,b)=>a.size-b.size);
        setProperties(sortedProperties);
    }
   return( <div className="dropdown-menu">
    <p onClick={rentSorting}>Sort by Rent</p>
    <p onClick={sizeSorting}>Sort by size</p>
    </div>)
}