import React from "react";
import "./search.css";
//import "bootstrap-icons/font/bootstrap-icons.css";
//import "remixicon/fonts/remixicon.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/js/bootstrap.js";

function Search() {
  return (
    <div className="search-bar">
      <form
        className="search-form d-flex align-items center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter Search Keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search" />
        </button>
      </form>
    </div>
  );
}

export default Search;
