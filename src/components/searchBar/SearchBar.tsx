import React, { FC, useState } from "react";
import "./searchbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder: string;
  isMobile: boolean
}



const SearchBar: FC<SearchBarProps> = ({ placeholder, isMobile }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()

  const searchClicked = async () => {
    navigate(`/search?q=${keyword}&type=posts`)
  }

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setKeyword(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData([]);
    }
  };


  return (
    <div className={`${isMobile ? "searchBarContainerMobile" : "searchBarContainer"}`}>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={handleFilter}
          onKeyPress={e => {
            if (e.key == 'Enter') {
              e.preventDefault()
              searchClicked()
            }
          }
          }

        />
        {!isMobile &&
          <IconButton onClick={searchClicked} className="searchIcon">
            <SearchIcon />
          </IconButton>
        }
      </div>
    </div>
  );
}

export default SearchBar;