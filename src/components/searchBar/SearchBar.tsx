import React, { FC, useState } from "react";
import "./searchbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import {useNavigate} from "react-router-dom";

interface SearchBarProps{
    placeholder: string;
}



const SearchBar: FC<SearchBarProps> = ({ placeholder }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()

  const searchClicked = async() => {
      navigate(`/search?q=${keyword}&type=posts`)
  }

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setKeyword(searchWord);
    console.log("input", keyword)
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData([]);
    //   setFilteredData(newFilter);
    }
  };


  return (
    <div>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={handleFilter}
          onKeyPress={e =>{
            if (e.key == 'Enter') {
              e.preventDefault()
              searchClicked()
            }
          }
          }
          
        />
        <IconButton onClick={searchClicked} className="searchIcon">
            <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default SearchBar;