import React from "react";

const Search = () => {
  return (
    <div class="input-group mb-3 mx-4">
      <input
        type="text"
        class="form-control"
        placeholder="tìm kiếm"
        aria-label="tìm kiếm"
        aria-describedby="button-addon2"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        <i className="fas fa-search search-icon"></i>
      </button>
    </div>
  );
};

export default Search;
