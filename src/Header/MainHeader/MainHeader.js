import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInput } from "../Styled";
import { MenuItem, TextField } from "@mui/material";

const Header = (props) => {
  const handleChange = (e) => {
    props.sortHandler(e.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "red" }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Gallery App
            </Typography>
            <TextField
              style={{ width: "10%" }}
              labelId="demo-simple-select-label"
              label="Filter"
              id="demo-simple-select"
              name="filters"
              onChange={handleChange}
              select
            >
              <MenuItem value="a">Filter by Owner name(A to Z)</MenuItem>
              <MenuItem value="z">Filter by Owner name(Z to A)</MenuItem>
            </TextField>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInput
                type="search"
                name="search"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => props.handleSearchChange(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
