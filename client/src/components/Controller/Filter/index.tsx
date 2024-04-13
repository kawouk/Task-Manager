import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterOption } from "./type";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import taskStore from "../../../stores/tasks";

const Filter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const newFilter = event.target.value;
    taskStore.setFilter(newFilter);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("filter", newFilter);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const filterOptions: FilterOption[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterValue = searchParams.get("filter") || filterOptions[0].value;
    taskStore.setFilter(filterValue);
  }, [location,[]]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <FilterAltIcon />
          Filter
        </InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taskStore.filter}
          label="Filter"
          onChange={handleChange}
          size="small"
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Filter;
