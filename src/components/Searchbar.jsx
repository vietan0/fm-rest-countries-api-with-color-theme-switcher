import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { bool, func, string } from 'prop-types';

export default function Searchbar({
  selectedRegion,
  setSelectedRegion,
  isFilteredByUnMember,
  setIsFilteredByUnMember,
  sortBy,
  setSortBy,
}) {
  const [filterAnchor, setFilterAnchor] = useState(null);
  const filterOpen = Boolean(filterAnchor);
  const handleFilterClick = (e) => setFilterAnchor(e.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);

  const [regionAnchor, setRegionAnchor] = useState(null);
  const regionMenuOpen = Boolean(regionAnchor);
  const handleRegionClick = (e) => setRegionAnchor(e.currentTarget);
  const handleRegionClose = () => setRegionAnchor(null);
  const selectRegion = (e) => setSelectedRegion((prev) => (prev === e.target.textContent ? '' : e.target.textContent));
  const handleUnMemberClick = () => setIsFilteredByUnMember((prev) => !prev);

  const [sortElem, setSortElem] = useState(null);
  const sortOpen = Boolean(sortElem);
  const handleSortClick = (e) => setSortElem(e.currentTarget);
  const handleSortClose = () => setSortElem(null);
  const selectSortCategory = (e) => setSortBy((prev) => (prev === e.target.textContent ? '' : e.target.textContent));
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((regionName) => (
    <MenuItem
      selected={selectedRegion === regionName}
      onClick={selectRegion}
      key={regionName}
    >
      {selectedRegion === regionName && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={selectedRegion !== regionName}>{regionName}</ListItemText>
    </MenuItem>
  ));

  const sortCategories = ['Name', 'Population', 'Area'].map((category) => (
    <MenuItem
      selected={sortBy === category}
      onClick={selectSortCategory}
      key={category}
    >
      {sortBy === category && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={sortBy !== category}>{category}</ListItemText>
    </MenuItem>
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <TextField
          id="input-with-sx"
          label="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button
          onClick={handleSortClick}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<SortIcon />}
          disableRipple
        >
          Sort By
        </Button>
        <Menu
          anchorEl={sortElem}
          open={sortOpen}
          onClose={handleSortClose}
        >
          {sortCategories}
        </Menu>
        <Button
          onClick={handleFilterClick}
          endIcon={<KeyboardArrowDownIcon />}
          startIcon={<FilterAltIcon />}
          disableRipple
        >
          Filter By
        </Button>
        <Menu
          open={filterOpen}
          anchorEl={filterAnchor}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className="filterMenu"
        >
          <MenuItem onClick={handleRegionClick}>
            <ListItemText inset>Region</ListItemText>
            <ChevronRightIcon />
          </MenuItem>
          <MenuItem onClick={handleUnMemberClick}>
            {isFilteredByUnMember && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={!isFilteredByUnMember}>UN Member</ListItemText>
          </MenuItem>
        </Menu>
        <Menu
          open={regionMenuOpen}
          anchorEl={regionAnchor}
          onClose={handleRegionClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className="regions"
        >
          {regions}
        </Menu>
      </Box>
    </Box>
  );
}

Searchbar.propTypes = {
  selectedRegion: string.isRequired,
  setSelectedRegion: func.isRequired,
  isFilteredByUnMember: bool.isRequired,
  setIsFilteredByUnMember: func.isRequired,
  sortBy: string.isRequired,
  setSortBy: func.isRequired,
};
