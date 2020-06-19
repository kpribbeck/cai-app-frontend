import React from "react";
import "./main.css";

const FilterBox = ({ value, onChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Ingrese su busqueda"
      />
    </div>
  );
};

export default FilterBox;
