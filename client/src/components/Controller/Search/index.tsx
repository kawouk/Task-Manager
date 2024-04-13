import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import taskStore from "../../../stores/tasks";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const Search: React.FC = () => {
  const search = (value: string) => {
    taskStore.setSearchValue(value);
  };
  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={taskStore.tasks.map((task) => task.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              search(e.target.value);
            }}
            label="Search"
            size="small"
            InputProps={{
              type: "search",
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Search;
