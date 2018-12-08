import React from "react";

const Search = ({ onSearchChanged }) => {
  return (
    <input
      type="text"
      placeholder="Recherche ..."
      onKeyUp={onSearchChanged}
      className="form-control"
    />
  );
};

export default Search;
