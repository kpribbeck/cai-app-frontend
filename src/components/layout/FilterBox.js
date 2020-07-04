import React from "react";
import "./main.css";

const FilterBox = ({ value, onChange }) => {
  return (
    <div className="a">
      <div className="row">
        <input
          type="text"
          className="filter"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder="Ingrese su busqueda"
        />
      </div>
    </div>
  );
};

export default FilterBox;
