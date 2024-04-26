import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const SearchBar = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onClick(searchTerm); // Call the provided onSearch function with the search term
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup width="30%">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputRightElement width="auto" marginRight="2px">
        <Button type="button" onClick={handleSearch}>
          Enter
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
